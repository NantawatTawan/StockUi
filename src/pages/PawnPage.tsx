import { useState } from "react";
import PawnListTable from "../components/Pawn/PawnListTable";
import AddPawnModal from "../components/Pawn/AddPawnModal";

export default function PawnPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-red-700">รายการจำนำ</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="ค้นหารายการจำนำ"
            className="border px-3 py-2 rounded w-60"
          />
          <select className="border rounded px-3 py-1 text-sm">
            <option value="">ตัวกรอง</option>
            <option value="active">จำนำอยู่</option>
            <option value="redeemed">หลุดจำนำ</option>
            <option value="redeemed">ไถ่ถอนแล้ว</option>
          </select>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            ➕ เพิ่มรายการจำนำ
          </button>
        </div>
      </div>
      <PawnListTable />
      <AddPawnModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
