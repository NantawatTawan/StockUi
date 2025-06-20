import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import MainLayout from "../layouts/MainLayout";
import ProductPage from "../pages/ProductPage";
import CustomerPage from "../pages/CustomerPage";
import CustomerDetailPage from "../pages/CustomerDetailPage";
import UserPage from "../pages/UserPage";
import EmployeePage from "../pages/EmployeePage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route
            path="/customers/detail/:id"
            element={<CustomerDetailPage />}
          />
          <Route path="/users" element={<UserPage />} />
          <Route path="/employees" element={<EmployeePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
