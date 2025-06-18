interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCustomerModal({
  isOpen,
  onClose,
}: AddCustomerModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">เพิ่มรายการลูกค้า</h2>
        {/*  id: number,name: string,phone: string,address: string,idCardData: string,createdAt: string;*/}
        <div className="grid grid-cols gap-2 space-y-2">
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="ชื่อ-สกุลลูกค้า"
          />
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="เลขที่บัตรประชาชน"
          />
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="เบอร์โทรศัพท์"
          />
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="ที่อยู่"
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
