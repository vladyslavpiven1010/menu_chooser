import { Dish, DishEatTime } from "../types";
import 'react-toastify/dist/ReactToastify.css';

interface DishCardProps {
  dish: Dish;
  onClick: () => void;
  onDisable?: () => void;
  onEnable?: () => void;
  chosenPerTime: Partial<Record<DishEatTime, Dish>>;
  cancelledDishIds?: string[];
}

export default function DishCard({
  dish,
  onClick,
  onDisable,
  onEnable,
  chosenPerTime,
  cancelledDishIds
}: DishCardProps) {
  const isCancelled = cancelledDishIds?.includes(dish._id);
  const chosenSlot = (Object.entries(chosenPerTime) as [DishEatTime, Dish][]).find(
    ([, chosenDish]) => chosenDish._id === dish._id
  )?.[0];

  const isChosen = !!chosenSlot && !isCancelled;

  return (
    <div
      className={`bg-white p-4 rounded-2xl shadow-md transition hover:shadow-lg cursor-pointer relative
        ${dish.disabledByYouToday ? "opacity-50 cursor-not-allowed" : ""}
        ${isChosen ? "outline outline-2 outline-green-300" : ""}
      `}
      onClick={!dish.disabledByYouToday ? onClick : undefined}
    >
      <img
        src={dish.imageUrl || "/default_dish.jpg"}
        alt={dish.name}
        className="w-full h-40 object-cover rounded-xl mb-2"
      />
      <h2 className="text-xl font-semibold text-pink-600 truncate">{dish.name}</h2>

      {isChosen && (
        <span className="absolute bottom-2 right-3 bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
          You chose for {chosenSlot} 🥗
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
          )
        )}
      </div>
    </div>
  );
}