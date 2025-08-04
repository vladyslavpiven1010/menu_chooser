import { useEffect, useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import NotificationModal from "./NotificationModal";
import {
  clearNotifications,
} from "../services/notificationApi";
import { useSocket } from "../contexts/SocketContext";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, reloadNotifications, markNotificationsAsRead } = useSocket(); 

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleClear = async () => {
    await clearNotifications();
    reloadNotifications();
  };

  const handleOpen = async () => {
    setIsOpen(true);
    await markNotificationsAsRead();
  };

  return (
    <div className="relative">
      <button onClick={handleOpen} className="relative">
        <BellIcon className="w-8 h-8 text-gray-700" />
        {unreadCount > 0 && (
          <span className="fixed -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setIsOpen(false)}
          onClear={handleClear}
        />
      )}
    </div>
  );
}