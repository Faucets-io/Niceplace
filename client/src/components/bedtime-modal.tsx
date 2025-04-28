
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
        <p className="mb-4 text-lg" style={{ lineHeight: "1.4" }}>
          You're almost done. We've sent you a confirmation code. Share this code with one of your trusted contacts to help complete your identity verification.
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
