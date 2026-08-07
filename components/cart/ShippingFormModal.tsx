"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { X, MapPin, Phone, User, Building, Compass } from "lucide-react";
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
    }
  }, [user, open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      toast.error("Please fill in all required shipping fields.");
      return;
    }

    setLoading(true);
    try {
      // Save/sync shipping details into Clerk User Metadata
      if (user) {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            shippingAddress: form,
          },
        });
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
              <p className="text-xs text-muted">Required for order delivery &amp; official receipt</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-muted hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-ink">Full Name *</label>
              <div className="relative">
                <input
                  required
                  className={inputCls}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-ink">Phone / WhatsApp *</label>
              <div className="relative">
                <input
                  required
                  className={inputCls}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-ink">Street Address / Landmark *</label>
            <textarea
              required
              rows={2}
              className={inputCls}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Flat / House No., Colony / Street, Landmark"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-ink">City *</label>
              <input
                required
                className={inputCls}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="e.g. Mumbai"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink">State *</label>
              <input
                required
                className={inputCls}
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                placeholder="e.g. Maharashtra"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink">Pincode *</label>
              <input
                required
                className={inputCls}
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                placeholder="400001"
              />
            </div>
          </div>

          <p className="pt-1 text-[0.7rem] text-muted">
            🔒 Your shipping profile is securely synchronized with your Clerk account.
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
