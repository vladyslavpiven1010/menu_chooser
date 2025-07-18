interface RoleSelectorProps {
  onRoleSelected: (role: "girlfriend" | "admin") => void;
}

export default function RoleSelector({ onRoleSelected }: RoleSelectorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 px-4">
      <h1 className="text-2xl font-bold text-pink-600 mb-6">Хто ви?</h1>
      <button
        onClick={() => onRoleSelected("girlfriend")}
        className="bg-rose-500 text-white px-6 py-3 rounded-xl mb-4 hover:bg-rose-600 w-full max-w-xs"
      >
        Я – дівчина 🍓
      </button>
      <button
        onClick={() => onRoleSelected("admin")}
        className="bg-gray-800 text-white px-6 py-3 rounded-xl hover:bg-gray-900 w-full max-w-xs"
      >
        Я – кухар 👨‍🍳
      </button>
    </div>
  );
}