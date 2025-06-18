import { useEffect, useState } from "react";
import axios from "axios";
import CustomerListTable from "../components/Table/CustomerListTable";
import AddCustomerModal from "../components/Modal/AddCustomerModal";

export interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
  idCardData: string;
  createdAt: string;
}

export default function CustomerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get<Customer[]>(
        "http://localhost:8080/api/customers"
      );
      setCustomers(res.data);
    } catch (err) {
      console.error("โหลดข้อมูลลูกค้าล้มเหลว", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-red-700">รายการลูกค้า</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            ➕ เพิ่มลูกค้า
          </button>
        </div>
      </div>
      <CustomerListTable customers={customers} />
      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
