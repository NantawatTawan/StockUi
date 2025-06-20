import { useEffect, useState } from "react";
import axios from "axios";
import CustomerListTable from "../components/Customer/CustomerListTable";
import AddCustomerModal from "../components/Customer/AddCustomerModal";

export interface Customer {
  id: number;
  name: string;
  phone: string;
  idCardData: string;
  address: string;
  createdAt: string;
}

export default function CustomerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/customers/${id}`);
      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบ:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await axios.get<Customer[]>(
        "http://localhost:8080/api/customers"
      );
      setCustomers(res.data.sort((a, b) => a.id - b.id));
    } catch (err) {
      console.error("โหลดข้อมูลลูกค้าล้มเหลว", err);
    }
  };

  const fetchCustomerSearch = async (keyword: string) => {
    try {
      setLoading(true);
      const res = await axios.get<Customer[]>(
        "http://localhost:8080/api/customers/search",
        {
          params: {
            name: keyword,
            phone: keyword,
          },
        }
      );
      setCustomers(res.data);
    } catch (err) {
      console.error("ค้นหาล้มเหลว", err);
      setCustomers([]); // fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Auto search from keyword
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchKeyword.trim() === "") {
        fetchCustomers();
      } else {
        fetchCustomerSearch(searchKeyword);
      }
    }, 300); // delay aftrr typing

    return () => clearTimeout(delay);
  }, [searchKeyword]);

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
      <div className="flex gap-4 flex-wrap mb-4">
        <input
          type="text"
          placeholder="ค้นหาชื่อหรือเบอร์โทรลูกค้า"
          className="border px-3 py-2 rounded w-60"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>
      {/* Customer list */}
      {loading ? (
        <div className="text-gray-400">กำลังโหลดข้อมูล...</div>
      ) : customers.length > 0 ? (
        <CustomerListTable customers={customers} onDelete={handleDelete} />
      ) : (
        <div className="text-gray-500">ไม่พบข้อมูลลูกค้าที่ตรงกับคำค้นหา</div>
      )}
      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCustomerAdded={fetchCustomers}
      />
    </div>
  );
}
