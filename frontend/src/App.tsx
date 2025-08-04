import { useEffect, useState } from "react";
import DishPage from "./pages/DishPage";
import { ToastContainer } from "react-toastify";
import RoleSelector from "./components/RoleSelector";
import NotificationBell from "./components/NotificationBell";
import { SocketProvider } from "./contexts/SocketContext";

export default function App() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole === "girlfriend" || savedRole === "admin") {
      setRole(savedRole);
    }
  }, []);

  const handleRoleSelected = (selectedRole: "girlfriend" | "admin") => {
    localStorage.setItem("role", selectedRole);
    setRole(selectedRole);
    window.location.reload();
  };

  if (!role) {
    return <RoleSelector onRoleSelected={handleRoleSelected} />;
  }

  return (
    <SocketProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <ToastContainer position="top-right" autoClose={3000} />
        <DishPage />
      </div>

      {role === "admin" && (
        <div className="fixed top-4 right-4">
          <NotificationBell />
        </div>
      )}
    </SocketProvider>
  );
}
