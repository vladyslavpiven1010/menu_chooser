import { Dish } from "../types";
import 'react-toastify/dist/ReactToastify.css';

interface DishCardProps {
  dish: Dish;
  onClick: () => void;
  onDisable?: () => void;
  onEnable?: () => void;
  chosenDishId: string | null;
  cancelledDishIds?: string[];
  showChooseField: boolean;
}

export default function DishCard({
  dish,
  onClick,
  onDisable,
  onEnable,
  chosenDishId,
  cancelledDishIds,
  showChooseField
}: DishCardProps) {
  const isChosen = dish._id === chosenDishId;
  const isCancelled = cancelledDishIds?.includes(dish._id);

  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className={`bg-white p-4 rounded-2xl shadow-md transition hover:shadow-lg cursor-pointer relative
        ${dish.disabledByYouToday ? "opacity-50" : ""}
        ${isChosen && !isCancelled ? "ring-4 ring-green-400" : ""}
      `}
      onClick={!dish.disabledByYouToday ? handleClick : undefined}
    >
      <img
        src={dish.imageUrl}
        alt={dish.name}
        className="w-full h-40 object-cover rounded-xl"
      />
      <h2 className="text-xl font-semibold text-pink-600 truncate">{dish.name}</h2>

      {isChosen && !isCancelled && showChooseField && (
        <span className="absolute bottom-2 right-3 bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
          You chose this 🥗
        </span>
      )}

      <div className="flex justify-between">
        {dish.disabledByYouToday ? (
          onEnable && (
            <button
              className="mt-3 text-sm text-green-500"
              onClick={(e) => {
                e.stopPropagation();
                onEnable();
              }}
            >
              Enable
            </button>
          )
        ) : ( 
          onDisable && (
            <button
              className="mt-3 text-sm text-yellow-600"
              onClick={(e) => {
                e.stopPropagation();
                onDisable();
              }}
            >
              Disable
            </button>
        ))}
      </div>
    </div>
  );
}