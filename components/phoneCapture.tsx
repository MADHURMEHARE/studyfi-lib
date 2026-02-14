"use client";
import { useState } from "react";

export default function PhoneCapture() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const sendPhone = async () => {
    if (!/^[0-9]{10}$/.test(phone)) {
      setMessage("❌ Please  a valid 10-digit ");
      return;
    }

    setMessage("⏳ Sending...");

    const res = await fetch("/api/owner-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    if (res.ok) {
      setMessage("✅ Phone number sent to owner!");
      setPhone("");
      setTimeout(() => setMessage(""), 2500);
    } else {
      setMessage("❌ Failed to send");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendPhone()}
        placeholder="Enter phone number..."
        className="
          w-[80%] px-4 py-2 border border-gray-300 rounded-full
          bg-white/80 backdrop-blur-md shadow-md
          focus:outline-none focus:ring-2 focus:ring-orange-400
          transition text-gray-900
        "
      />

      {message && (
        <div className="mt-3 px-4 py-2 rounded-full bg-black/60 text-white text-sm animate-fade">
          {message}
        </div>
      )}
 <button
        onClick={sendPhone}
        className="
          px-6 py-2 rounded-full
          bg-orange-500 text-white font-medium
          hover:bg-orange-600 active:scale-95
          transition shadow-md mt-4
        "
      >
        for enquiry
      </button>
      <style jsx>{`
        .animate-fade {
          animation: fadeInOut 2.5s ease-in-out;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
