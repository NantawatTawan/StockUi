import { useState } from "react";

interface AddPawnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPawnModal({ isOpen, onClose }: AddPawnModalProps) {
  const getDateNow = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  const [pledgeDate, setPledgeDate] = useState(() => getDateNow());

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">เพิ่มรายการจำนำ</h2>
        <div className="grid grid-cols gap-2 space-y-2">
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="ชื่อลูกค้า"
          />
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="รายละเอียดทอง"
          />
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            placeholder="ดอกเบี้ย"
          />
          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={pledgeDate}
            onChange={(e) => setPledgeDate(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            เพิ่ม
          </button>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
}
