import "react-toastify/dist/ReactToastify.css";

interface DishModalProps {
  dish: any;
  onClose: () => void;
  onDishChosen: () => void;
  onCancelChosen: () => void;
  chosenDishId: string | null;
}

export default function DishModal({ dish, onClose, onDishChosen, onCancelChosen, chosenDishId }: DishModalProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  const handleChoose = async () => {
    onDishChosen();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full relative animate-fadeIn flex flex-col gap-2"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-pink-600">{dish.name}</h2>

        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="w-full h-56 object-cover rounded-lg"
        />

        <p className="text-gray-600">{dish.description}</p>

        <h3 className="font-semibold text-gray-800">Ingredients:</h3>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          {dish.ingredients.map((i: string, idx: number) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>

        {dish._id === chosenDishId ? (
          <button
            onClick={() => {
              onCancelChosen();
              onClose();
            }}
            className="mt-3 w-full text-sm text-rose-500 border border-rose-300 rounded-lg py-2 hover:bg-rose-100 transition-all"
          >
            Cancel your choice ❌
          </button>
        ) : (
          <button
          onClick={handleChoose}
          disabled={!!chosenDishId}
          className={`text-white font-semibold py-2 px-4 rounded-xl w-full
            ${chosenDishId ? "bg-gray-400 cursor-not-allowed" : "bg-rose-500 hover:bg-rose-600"}`}
        >
          {chosenDishId ? "You already chose a dish today 🍳" : "Choose"}
        </button>
        )}
      </div>
    </div>
  );
}