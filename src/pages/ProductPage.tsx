import { useEffect, useState } from "react";
import axios from "axios";
import AddProductModal from "../components/product/AddProductModal";
import ProductTable from "../components/product/ProductTable";

export interface Product {
  id: number;
  itemName: string;
  weightValue: number;
  unit: string;
  quantity: number;
  type: {
    id: number;
    name: string;
  };
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:8080/api/stock-items/${id}`);
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:8080/api/stock-items")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("โหลดสินค้าล้มเหลว", err));
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-red-700">รายการสินค้า</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          ➕ เพิ่มสินค้า
        </button>
      </div>

      <ProductTable products={products} onDelete={handleDelete} />

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
