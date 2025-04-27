import React from "react";
import { Button } from "@/components/ui/button";

interface BedtimeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BedtimeModal({ open, onClose }: BedtimeModalProps) {
  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 bedtime-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 animate-slide-up shadow-lg">
        <div className="text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 mx-auto text-blue-600 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
            />
          </svg>
          <h2 className="text-2xl font-bold mb-2 text-facebook-blue">It's Bedtime!</h2>
          <p className="text-facebook-text-dark mb-4">
            Time to put away the phone and get some rest. Sweet dreams!
          </p>
          <p className="text-facebook-text-light text-sm mb-6">
            This is not a real Facebook page. It's just a reminder that it's time for bed.
          </p>
          <Button 
            onClick={onClose}
            className="facebook-button bg-facebook-blue text-white py-2 px-6 rounded-md font-bold transition duration-200"
          >
            Okay, Goodnight
          </Button>
        </div>
      </div>
    </div>
  );
}
