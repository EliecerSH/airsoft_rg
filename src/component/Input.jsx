import React from "react";

export default function Input({ label, type = "text", name, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="font-semibold text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
      />
    </div>
  );
}
