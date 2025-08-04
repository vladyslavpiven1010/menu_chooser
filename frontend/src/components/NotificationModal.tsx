interface Props {
  notifications: {message: string, createdAt: string}[];
  onClose: () => void;
  onClear: () => void;
}

export default function NotificationModal({ notifications, onClose, onClear }: Props) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 z-[999] flex justify-center items-start pt-24"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-4 z-[1000] relative">
        <h2 className="text-lg font-semibold mb-3">Notifications</h2>

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

        <div className="flex justify-between mt-4">
          <button
            onClick={onClear}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Clear History
          </button>

          <button
            onClick={onClose}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}