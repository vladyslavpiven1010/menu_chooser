import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { io, Socket } from "socket.io-client";
import { fetchNotifications, markAllNotificationsAsRead } from "../services/notificationApi";

interface SocketContextType {
  socket: Socket | null;
  cancelledDishIds: string[];
  notifications: { message: string; createdAt: string }[];
  unreadCount: number;
  reloadNotifications: () => Promise<void>;
  markNotificationsAsRead: () => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  cancelledDishIds: [],
  notifications: [],
  unreadCount: 0,
  reloadNotifications: async () => {},
  markNotificationsAsRead: () => {}
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  const [cancelledDishIds, setCancelledDishIds] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<{ message: string; createdAt: string }[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const reloadNotifications = async () => {
    const data = await fetchNotifications();
    setNotifications(data);

    const unread = data.filter((n: any) => !n.isRead);
    setUnreadCount(unread.length);
    console.log("Unread count ", unread.length)
  };

  useEffect(() => {
    const role = localStorage.getItem("role");

    reloadNotifications();

    if (role === "admin") {
        socketRef.current = io("http://localhost:3000");

        socketRef.current.on("connect", () => {
          console.log("Connected to WebSocket server");
        });

        socketRef.current.on("dish", async (data: any) => {
          if (data.type === "dishCancel" && data.dishId) {
            setCancelledDishIds((prev) => [...prev, data.dishId]);
          }

          await reloadNotifications();
        });
    }

    return () => {
        socketRef.current?.disconnect();
        socketRef.current = null;
    };
    }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        cancelledDishIds,
        notifications,
        unreadCount,
        reloadNotifications,
        markNotificationsAsRead: async () => {
          await markAllNotificationsAsRead();
          await reloadNotifications();
        },
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);