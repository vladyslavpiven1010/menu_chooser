import Modal from "./modal";

interface Props {
  notifications: {message: string, createdAt: string}[];
  onClose: () => void;
  onClear: () => void;
}

export default function NotificationModal({ notifications, onClose, onClear }: Props) {
  return (
    <Modal isOpen={true} onClose={onClose}>
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Notifications</h2>

        <ul className="space-y-2 max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <li className="text-center text-gray-500 italic">No notifications yet 📭</li>
          ) : (
            notifications.map((n, idx) => (
              <li key={idx} className="bg-gray-100 p-2 rounded-md text-sm">
                <div>{n.message}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(n.createdAt).toLocaleDateString()}
                </div>
              </li>
            ))
          )}
        </ul>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClear}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Clear History
          </button>
        </div>
    </Modal>
  );
}