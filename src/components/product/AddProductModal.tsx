interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
}: AddProductModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">เพิ่มสินค้าใหม่</h2>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="ชื่อสินค้า"
            className="w-full border px-3 py-2 rounded"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="น้ำหนัก"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="หน่วย (บาท/กรัม)"
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <input
            type="number"
            placeholder="จำนวน"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="ประเภทสินค้า"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded bg-gray-300 hover:bg-gray-400"
          >
            ยกเลิก
          </button>
          <button className="px-4 py-2 text-sm rounded bg-green-500 text-white hover:bg-green-600">
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}
