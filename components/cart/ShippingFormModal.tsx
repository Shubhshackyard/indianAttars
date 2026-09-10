"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { X, MapPin, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "@/lib/toast";

export interface ShippingDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface ShippingFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (details: ShippingDetails) => void;
}

const inputCls =
  "mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-gold";

const errorInputCls =
  "mt-1 w-full rounded-md border border-red-500 bg-red-500/5 px-3 py-2 text-sm text-ink focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500";

// Regular Expressions for strict data validation
const REGEX_NAME = /^[a-zA-Z\s'.]{2,50}$/;
const REGEX_PHONE = /^(?:\+91[\-\s]?)?[6-9]\d{9}$|^\+?[1-9]\d{9,14}$/; // Supports 10-digit Indian numbers & standard international
const REGEX_ADDRESS = /^[a-zA-Z0-9\s,.\/#-]{8,150}$/;
const REGEX_CITY = /^[a-zA-Z\s.-]{2,50}$/;
const REGEX_STATE = /^[a-zA-Z\s.-]{2,50}$/;
const REGEX_PINCODE = /^[1-9][0-9]{5}$/; // 6-digit Indian PIN code

export function ShippingFormModal({ open, onClose, onSubmit }: ShippingFormModalProps) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<ShippingDetails>({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ShippingDetails, string>>>({});

  useEffect(() => {
    if (user) {
      const savedAddress = (user.unsafeMetadata?.shippingAddress as ShippingDetails) || {};
      setForm({
        name: savedAddress.name || user.fullName || user.firstName || "",
        phone: savedAddress.phone || user.primaryPhoneNumber?.phoneNumber || "",
        address: savedAddress.address || "",
        city: savedAddress.city || "",
        state: savedAddress.state || "",
        pincode: savedAddress.pincode || "",
      });
      setErrors({});
    }
  }, [user, open]);

  if (!open) return null;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingDetails, string>> = {};

    // 1. Full Name validation
    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (!REGEX_NAME.test(form.name.trim())) {
      newErrors.name = "Enter a valid full name (letters only, min 2 characters).";
    }

    // 2. Phone validation
    const cleanPhone = form.phone.trim().replace(/\s+/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Phone number is required.";
    } else if (!REGEX_PHONE.test(cleanPhone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number (e.g. 9876543210).";
    }

    // 3. Street Address validation
    if (!form.address.trim()) {
      newErrors.address = "Street address is required.";
    } else if (!REGEX_ADDRESS.test(form.address.trim()) || form.address.trim().length < 8) {
      newErrors.address = "Please enter a detailed street address/landmark (min 8 characters).";
    }

    // 4. City validation
    if (!form.city.trim()) {
      newErrors.city = "City is required.";
    } else if (!REGEX_CITY.test(form.city.trim())) {
      newErrors.city = "Enter a valid city name.";
    }

    // 5. State validation
    if (!form.state.trim()) {
      newErrors.state = "State is required.";
    } else if (!REGEX_STATE.test(form.state.trim())) {
      newErrors.state = "Enter a valid state name.";
    }

    // 6. Pincode validation
    const cleanPincode = form.pincode.trim();
    if (!cleanPincode) {
      newErrors.pincode = "Pincode is required.";
    } else if (!REGEX_PINCODE.test(cleanPincode)) {
      newErrors.pincode = "Enter a valid 6-digit PIN code (e.g. 400001).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix validation errors before proceeding.");
      return;
    }

    setLoading(true);
    try {
      // Save/sync shipping details into Clerk User Metadata
      if (user) {
        if (typeof (user as any).updateMetadata === "function") {
          await (user as any).updateMetadata({
            unsafeMetadata: {
              ...user.unsafeMetadata,
              shippingAddress: form,
            },
          });
        } else {
          await user.update({
            unsafeMetadata: {
              ...user.unsafeMetadata,
              shippingAddress: form,
            },
          });
        }
      }
    } catch (err: any) {
      console.warn("Could not save shipping address to Clerk metadata:", err);
    } finally {
      setLoading(false);
      onSubmit(form);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-bg p-6 shadow-lift">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-soft text-primary">
              <MapPin size={18} />
            </span>
            <div>
              <h3 className="font-display text-xl text-ink">Shipping &amp; Contact Details</h3>
              <p className="text-xs text-muted">Verified details required for order delivery &amp; receipt</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-muted hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5" noValidate>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-ink">Full Name *</label>
              <input
                required
                className={errors.name ? errorInputCls : inputCls}
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="e.g. Rahul Sharma"
              />
              {errors.name && (
                <p className="mt-1 flex items-center gap-1 text-[0.7rem] text-red-500">
                  <AlertCircle size={11} /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-ink">Phone / WhatsApp *</label>
              <input
                required
                type="tel"
                className={errors.phone ? errorInputCls : inputCls}
                value={form.phone}
                onChange={(e) => {
                  setForm({ ...form, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                placeholder="10-digit mobile e.g. 9876543210"
              />
              {errors.phone && (
                <p className="mt-1 flex items-center gap-1 text-[0.7rem] text-red-500">
                  <AlertCircle size={11} /> {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-ink">Street Address / Landmark *</label>
            <textarea
              required
              rows={2}
              className={errors.address ? errorInputCls : inputCls}
              value={form.address}
              onChange={(e) => {
                setForm({ ...form, address: e.target.value });
                if (errors.address) setErrors({ ...errors, address: undefined });
              }}
              placeholder="Flat / House No., Colony / Street, Landmark"
            />
            {errors.address && (
              <p className="mt-1 flex items-center gap-1 text-[0.7rem] text-red-500">
                <AlertCircle size={11} /> {errors.address}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-ink">City *</label>
              <input
                required
                className={errors.city ? errorInputCls : inputCls}
                value={form.city}
                onChange={(e) => {
                  setForm({ ...form, city: e.target.value });
                  if (errors.city) setErrors({ ...errors, city: undefined });
                }}
                placeholder="e.g. Mumbai"
              />
              {errors.city && (
                <p className="mt-1 flex items-center gap-1 text-[0.7rem] text-red-500">
                  <AlertCircle size={11} /> {errors.city}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-ink">State *</label>
              <input
                required
                className={errors.state ? errorInputCls : inputCls}
                value={form.state}
                onChange={(e) => {
                  setForm({ ...form, state: e.target.value });
                  if (errors.state) setErrors({ ...errors, state: undefined });
                }}
                placeholder="e.g. Maharashtra"
              />
              {errors.state && (
                <p className="mt-1 flex items-center gap-1 text-[0.7rem] text-red-500">
                  <AlertCircle size={11} /> {errors.state}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-ink">Pincode *</label>
              <input
                required
                maxLength={6}
                className={errors.pincode ? errorInputCls : inputCls}
                value={form.pincode}
                onChange={(e) => {
                  setForm({ ...form, pincode: e.target.value });
                  if (errors.pincode) setErrors({ ...errors, pincode: undefined });
                }}
                placeholder="6-digit PIN"
              />
              {errors.pincode && (
                <p className="mt-1 flex items-center gap-1 text-[0.7rem] text-red-500">
                  <AlertCircle size={11} /> {errors.pincode}
                </p>
              )}
            </div>
          </div>

          <p className="pt-1 text-[0.7rem] text-muted">
            🔒 RegEx validated data is securely synchronized with your Clerk profile.
          </p>

          <div className="flex items-center justify-end gap-3 pt-3">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" disabled={loading}>
              {loading ? "Saving..." : "Proceed to Payment →"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
