import React from "react";

export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition flex items-center gap-4 border">
      <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-2xl">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

