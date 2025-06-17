import type { Product } from "../../pages/ProductPage";

interface Props {
  products: Product[];
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}

export default function ProductTable({ products, onDelete, onEdit }: Props) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              #
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              ชื่อสินค้า
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              ประเภท
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              น้ำหนัก
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              จำนวน
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              หมายเหตุ
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              จัดการ
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((product, index) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm">{index + 1}</td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {product.itemName}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {product.type?.name || "-"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {product.weightValue} {product.unit}
              </td>
              <td className="px-4 py-2 text-sm text-blue-700 font-semibold">
                {product.quantity}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {product.note || "-"}
              </td>
              <td className="px-4 py-2 text-sm space-x-2">
                <button
                  onClick={() => onEdit(product)}
                  className="text-yellow-600 hover:underline"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => {
                    if (confirm("ต้องการลบสินค้านี้จริงหรือไม่?")) {
                      onDelete(product.id);
                    }
                  }}
                  className="text-red-600 hover:underline"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
