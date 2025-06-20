import { useNavigate } from "react-router-dom";

export default function PawnListTable() {
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
              รายการจำนำ
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              ชื่อลูกค้า
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              สถานะ
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          <tr
            className="hover:bg-yellow-200 cursor-pointer"
            onClick={() => navigate("/pledges/detail")}
          >
            <td className="px-4 py-2 text-sm text-gray-700">1</td>
            <td className="px-4 py-2 text-sm text-gray-700">สร้อยทองคำ</td>
            <td className="px-4 py-2 text-sm text-gray-700">
              มั่งโยกอยู่ในฟลอร์
            </td>
            <td className="px-4 py-2 text-sm text-green-600 font-medium">
              จำนำอยู่
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
