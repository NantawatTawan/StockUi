import { useNavigate } from "react-router-dom";
import type { Customer } from "../../pages/CustomerPage";

interface CustomerListProps {
  customers: Customer[];
}

function normalizeDateString(dateStr: string): string {
  return dateStr.replace(/(\.\d{3})\d*/, "$1");
}
function formatDate(dateStr: string): string {
  const normalized = normalizeDateString(dateStr);
  const dateObj = new Date(normalized);
  const formatter = new Intl.DateTimeFormat("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formatter.format(dateObj);
}

export default function CustomerListTable({ customers }: CustomerListProps) {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              #
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              ชื่อ-สกุลลูกค้า
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              วันที่เพิ่ม
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              จัดการ
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100 ">
          {customers.map((c) => (
            <tr
              key={c.id}
              className="hover:bg-yellow-200 cursor-pointer"
              onClick={() => navigate(`/customers/detail/${c.id}`)}
            >
              <td className="px-4 py-2 text-sm text-gray-700">{c.id}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{c.name}</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {formatDate(c.createdAt)}
              </td>
              <td className="px-4 py-2 text-sm space-x-2">
                <button className="text-red-600 hover:underline cursor-pointer">
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
