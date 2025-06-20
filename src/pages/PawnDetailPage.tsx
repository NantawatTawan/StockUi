import FormRow from "../components/FormRow";

export default function PawnDetailPage() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-red-700">รายละเอียดการจำนำ</h1>
      </div>
      <div className="p-6 space-y-4 overflow-x-auto bg-white rounded shadow">
        <h1 className="font-bold">ข้อมูลลูกค้า</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormRow label="ชื่อลูกค้า">
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={"มั่งโยกอยู่ในฟลอร์"}
            />
          </FormRow>
          <FormRow label="วันเกิด">
            <input type="date" className="w-full border px-3 py-2 rounded" />
          </FormRow>
          <FormRow label="เลขที่บัตรประชาชน">
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={"55555555555"}
            />
          </FormRow>
          <FormRow label="เบอร์โทรศัพท์">
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={"099999999"}
            />
          </FormRow>
          <FormRow label="ที่อยู่">
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={"เขาย้อย เพชรบุรี"}
            />
          </FormRow>
        </div>

        <h1 className="font-bold">ข้อมูลการจำนำ</h1>
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
          <FormRow label="สถานะ">
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={"จำนำอยู่"}
            />
          </FormRow>
          <FormRow label="ราคาจำนำ (บาท)">
            <input
              type="number"
              className="w-full border px-3 py-2 rounded"
              value={"3000"}
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
            <input type="date" className="w-full border px-3 py-2 rounded" />
          </FormRow>
          <FormRow label="วันที่ครบกำหนด">
            <input type="date" className="w-full border px-3 py-2 rounded" />
          </FormRow>
          <FormRow label="วันที่นำออก">
            <input type="date" className="w-full border px-3 py-2 rounded" />
          </FormRow>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            ต่อสัญญา
          </button>
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            ไถ่ถอน
          </button>
          <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
            พิมพ์ใบจำนำ
          </button>
        </div>
      </div>
    </div>
  );
}
