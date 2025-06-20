import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import type { Customer } from "./CustomerPage";
import FormRow from "../components/FormRow";

interface Tab {
  id: string;
  label: string;
}

export default function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const tabs: Tab[] = [
    { id: "ข้อมูลลูกค้า", label: "ข้อมูลลูกค้า" },
    { id: "ข้อมูลจำนำ", label: "ข้อมูลจำนำ" },
  ];

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("ข้อมูลลูกค้า");
  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);

  const handleSave = async () => {
    try {
      if (!editedCustomer) return;
      await axios.put(
        `http://localhost:8080/api/customers/${editedCustomer.id}`,
        editedCustomer
      );
      setCustomer(editedCustomer);
      setIsEditing(false);
    } catch (err) {
      console.log("อัปเดตไม่สำเร็จ", err);
    }
  };

  const handleCancel = () => {
    setEditedCustomer(null);
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      try {
        const res = await axios.get<Customer>(
          `http://localhost:8080/api/customers/${id}`
        );
        setCustomer(res.data);
      } catch (err) {
        console.error("ดึงข้อมูลลูกค้าไม่สำเร็จ", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCustomerDetail();
  }, [id]);

  if (loading) return <div className="p-6">กำลังโหลด...</div>;
  if (!customer) return <div className="p-6 text-red-600">ไม่พบข้อมูล</div>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-red-700">รายละเอียดลูกค้า</h1>
      </div>
      {/* Tab bar */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <div className="min-w-full divide-y divide-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-4 py-2 font-medium ${
                activeTab === tab.id
                  ? "border-b-2 border-yellow-500 text-yellow-500"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {/* Customer detail tab */}
          {activeTab === "ข้อมูลลูกค้า" && (
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormRow label="ชื่อลูกค้า">
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    value={
                      isEditing ? editedCustomer?.name ?? "" : customer.name
                    }
                    onChange={(e) =>
                      setEditedCustomer((prev) =>
                        prev ? { ...prev, name: e.target.value } : prev
                      )
                    }
                    readOnly={!isEditing}
                  />
                </FormRow>
                <FormRow label="วันที่เพิ่ม">
                  <input
                    type="date"
                    className="w-full border px-3 py-2 rounded"
                    value={customer.createdAt.substring(0, 10)}
                    readOnly
                  />
                </FormRow>

                <FormRow label="เลขที่บัตรประชาชน">
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    value={
                      isEditing
                        ? editedCustomer?.idCardData ?? ""
                        : customer.idCardData
                    }
                    onChange={(e) =>
                      setEditedCustomer((prev) =>
                        prev ? { ...prev, idCardData: e.target.value } : prev
                      )
                    }
                    readOnly={!isEditing}
                  />
                </FormRow>
                <FormRow label="เบอร์โทรศัพท์">
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    value={
                      isEditing ? editedCustomer?.phone ?? "" : customer.phone
                    }
                    onChange={(e) =>
                      setEditedCustomer((prev) =>
                        prev ? { ...prev, phone: e.target.value } : prev
                      )
                    }
                    readOnly={!isEditing}
                  />
                </FormRow>
                <FormRow label="ที่อยู่">
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    value={
                      isEditing
                        ? editedCustomer?.address ?? ""
                        : customer.address
                    }
                    onChange={(e) =>
                      setEditedCustomer((prev) =>
                        prev ? { ...prev, address: e.target.value } : prev
                      )
                    }
                    readOnly={!isEditing}
                  />
                </FormRow>
              </div>
            </div>
          )}
          {/* Pawn detail tab */}
          {activeTab === "ข้อมูลจำนำ" && (
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormRow label="เลขที่จำนำ">
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    value={"1"}
                  />
                </FormRow>
                <FormRow label="รายการจำนำ">
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    value={"ทอง 9K"}
                  />
                </FormRow>
                <FormRow label="ดอกเบี้ย (บาท)">
                  <input
                    type="number"
                    className="w-full border px-3 py-2 rounded"
                    value={"500"}
                  />
                </FormRow>
                <FormRow label="วันที่จำนำ">
                  <input
                    type="date"
                    className="w-full border px-3 py-2 rounded"
                  />
                </FormRow>
                <FormRow label="วันที่ครบกำหนด">
                  <input
                    type="date"
                    className="w-full border px-3 py-2 rounded"
                  />
                </FormRow>
                <FormRow label="วันที่นำออก">
                  <input
                    type="date"
                    className="w-full border px-3 py-2 rounded"
                  />
                </FormRow>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        {/* if isEditing -> Change แก้ไข to บันทึก&ยกเลิก */}
        {isEditing ? (
          <>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleSave}
            >
              บันทึก
            </button>
            <button
              className="mt-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              onClick={handleCancel}
            >
              ยกเลิก
            </button>
          </>
        ) : (
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => {
              setIsEditing(true);
              setEditedCustomer(customer);
            }}
          >
            แก้ไข
          </button>
        )}
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => navigate(-1)}
        >
          ย้อนกลับ
        </button>
      </div>
    </div>
  );
}
