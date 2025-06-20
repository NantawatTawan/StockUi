import type { Employee } from "../../pages/EmployeePage";
import { Button } from "../ui/Button";

interface Props {
  employees: Employee[];
  onDelete: (id: number) => void;
  onEdit: (employee: Employee) => void;
}

export default function EmployeeTable({ employees, onDelete, onEdit }: Props) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2">ชื่อ</th>
            <th className="text-left p-2">เบอร์โทร</th>
            <th className="text-left p-2">ตำแหน่ง</th>
            <th className="text-left p-2">วันที่เริ่ม</th>
            <th className="text-left p-2">เงินเดือน</th>
            <th className="text-left p-2">สถานะ</th>
            <th className="text-left p-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-t">
              <td className="p-2">{emp.fullName}</td>
              <td className="p-2">{emp.phone}</td>
              <td className="p-2">{emp.position}</td>
              <td className="p-2">
                {new Date(emp.startDate).toLocaleDateString("th-TH")}
              </td>
              <td className="p-2">{emp.salary.toLocaleString()} บาท</td>
              <td className="p-2">{emp.isActive ? "ใช้งาน" : "ไม่ใช้งาน"}</td>
              <td className="p-2 space-x-2">
                <Button
                  className="text-sm px-3 py-1"
                  onClick={() => onEdit(emp)}
                >
                  แก้ไข
                </Button>
                <Button
                  className="text-sm px-3 py-1"
                  variant="danger"
                  onClick={() => onDelete(emp.id)}
                >
                  ลบ
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
