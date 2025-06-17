import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "../../pages/ProductPage";

interface StockType {
  id: number;
  name: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
  productToEdit?: Product | null;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onProductAdded,
  productToEdit,
}: AddProductModalProps) {
  const [itemName, setItemName] = useState("");
  const [weightValue, setWeightValue] = useState<number | "">("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [typeId, setTypeId] = useState<number | "">("");
  const [note, setNote] = useState("");
  const [stockTypes, setStockTypes] = useState<StockType[]>([]);

  useEffect(() => {
    if (isOpen) {
      axios
        .get<StockType[]>("http://localhost:8080/api/stock-types")
        .then((res) => setStockTypes(res.data))
        .catch((err) => console.error("โหลดประเภทสินค้าล้มเหลว", err));

      if (productToEdit) {
        // ถ้าแก้ไข → เติมข้อมูลเดิม
        setItemName(productToEdit.itemName);
        setWeightValue(productToEdit.weightValue);
        setUnit(productToEdit.unit);
        setQuantity(productToEdit.quantity);
        setNote(productToEdit.note || "");
        setTypeId(productToEdit.type?.id || "");
      } else {
        // ถ้าเพิ่มใหม่ → ล้างข้อมูล
        setItemName("");
        setWeightValue("");
        setUnit("");
        setQuantity("");
        setNote("");
        setTypeId("");
      }
    }
  }, [isOpen, productToEdit]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      const data = {
        itemName,
        weightValue,
        unit,
        quantity,
        note,
        type: { id: typeId },
      };

      if (productToEdit?.id) {
        await axios.put(
          `http://localhost:8080/api/stock-items/${productToEdit.id}`,
          data
        );
      } else {
        await axios.post("http://localhost:8080/api/stock-items", data);
      }

      onProductAdded();
      onClose();
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการบันทึก:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-transparent bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">
          {productToEdit ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
        </h2>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="ชื่อสินค้า"
            className="w-full border px-3 py-2 rounded"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="น้ำหนัก"
              className="w-full border px-3 py-2 rounded"
              value={weightValue}
              onChange={(e) => setWeightValue(Number(e.target.value))}
            />
            <input
              type="text"
              placeholder="หน่วย (บาท/กรัม)"
              className="w-full border px-3 py-2 rounded"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>

          <input
            type="number"
            placeholder="จำนวน"
            className="w-full border px-3 py-2 rounded"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <select
            className="w-full border px-3 py-2 rounded"
            value={typeId}
            onChange={(e) => setTypeId(Number(e.target.value))}
          >
            <option value="">เลือกประเภทสินค้า</option>
            {stockTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          <textarea
            placeholder="หมายเหตุ"
            className="w-full border px-3 py-2 rounded"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded bg-gray-300 hover:bg-gray-400"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded bg-green-500 text-white hover:bg-green-600"
          >
            {productToEdit ? "อัปเดต" : "บันทึก"}
          </button>
        </div>
      </div>
    </div>
  );
}
