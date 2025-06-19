import { useEffect, useState } from "react";
import axios from "axios";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomerAdded: () => void;
}

export default function AddCustomerModal({
  isOpen,
  onClose,
  onCustomerAdded,
}: AddCustomerModalProps) {
  if (!isOpen) return null;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [idCardData, setIdCardData] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setPhone("");
      setIdCardData("");
      setBirthDate("");
      setExpiryDate("");
      setAddress("");
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      const data = {
        name,
        phone,
        idCardData,
        birthDate: `${birthDate}T00:00:00`,
        expiryDate: `${expiryDate}T00:00:00`,
        address,
      };
      await axios.post("http://localhost:8080/api/customers", data);
      onCustomerAdded();
      onClose();
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการบันทึก:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">เพิ่มรายการลูกค้า</h2>
        <div className="grid grid-cols-1 gap-2">
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="ชื่อ-สกุลลูกค้า"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="เบอร์โทรศัพท์"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="เลขที่บัตรประชาชน"
            value={idCardData}
            onChange={(e) => setIdCardData(e.target.value)}
          />
          <label className="mb-1 text-md text-gray-500">วันเกิด</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <label className="mb-1 text-md text-gray-500">วันบัตรหมดอายุ</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            placeholder="วันบัตรหมดอายุ"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
          <textarea
            className="w-full border px-3 py-2 rounded"
            placeholder="ที่อยู่"
            rows={4}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
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
