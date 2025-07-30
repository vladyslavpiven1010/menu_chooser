import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import "react-toastify/dist/ReactToastify.css";

interface DishModalProps {
  dish: any;
  onClose: () => void;
  onDishChosen: () => void;
  onCancelChosen: () => void;
  onDelete: (dishId: string) => void;
  onEdit: (dish: any) => void;
  chosenDishId: string | null;
}

export default function DishModal({
  dish,
  onClose,
  onDishChosen,
  onCancelChosen,
  onDelete,
  onEdit,
  chosenDishId,
}: DishModalProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  const handleChoose = () => {
    onDishChosen();
    onClose();
  };

  const handleDelete = () => {
    onDelete(dish._id);
    onClose();
  };

  const handleEdit = () => {
    onEdit(dish);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full relative animate-fadeIn flex flex-col gap-2">
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

        <div className="flex justify-between gap-2 flex-col sm:flex-row">
          {dish._id === chosenDishId ? (
            <button
              onClick={() => {
                onCancelChosen();
                onClose();
              }}
              className="w-full text-sm text-rose-500 border border-rose-300 rounded-lg py-2 hover:bg-rose-100 transition-all"
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

          <div className="flex gap-2 justify-end mt-2 sm:mt-0">
            <button
              onClick={handleEdit}
              className="flex items-center gap-1 px-3 py-2 text-sm bg-green-400 hover:bg-green-500 text-white rounded-lg"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1 px-3 py-2 text-sm bg-[#ff0000] hover:bg-red-500 text-white rounded-lg"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}