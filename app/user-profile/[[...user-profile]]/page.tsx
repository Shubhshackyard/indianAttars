import { UserProfile } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Profile",
  description: "Manage your indianattars account settings, profile details, and security.",
};

export default function UserProfilePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex justify-center">
        <UserProfile path="/user-profile" routing="path" />
      </div>
    </div>
  );
}
