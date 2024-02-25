import React from "react";
import { useEffect } from "react";

export default function Alert({ open, setOpen, message }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(false);
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div
      className="fixed bottom-2 right-2 bg-red-600 text-white font-medium p-2 rounded-lg"
      style={{ display: open ? "block" : "none" }}
    >
      💀 {message}
    </div>
  );
}
