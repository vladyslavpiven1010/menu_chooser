import React from "react";
import { motion } from "framer-motion";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "Do you want to proceed?",
  confirmText = "Yes",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative z-10 w-full max-w-md p-6 bg-white rounded-2xl shadow-lg"
      >
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        <p className="mt-3 text-sm text-gray-600">{message}</p>
        
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-pink-500 hover:bg-pink-600 rounded-lg transition"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
};