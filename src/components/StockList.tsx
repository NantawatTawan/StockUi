export interface StockItem {
  id: number;
  itemName: string;
  weightValue: number;
  unit: string;
  quantity: number;
}

export default function StockList({ items }: { items: StockItem[] }) {
  return (
    <div className="bg-white p-4 rounded shadow h-full">
      <h2 className="text-xl font-semibold mb-4">
        สินค้าในคลัง ({items.length} รายการ)
      </h2>

      <div className="overflow-y-auto max-h-96 border rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                #
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                ชื่อสินค้า
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                น้ำหนัก
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                จำนวนคงเหลือ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item, idx) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">{idx + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {item.itemName}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {item.weightValue} {item.unit}
                </td>
                <td className="px-4 py-2 text-sm text-blue-700 font-semibold text-center">
                  {item.quantity} ชิ้น
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
