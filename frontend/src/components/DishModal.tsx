import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Dish, DishEatTime } from "../types";
import Modal from "./modal";

interface DishModalProps {
  dish: Dish;
  onClose: () => void;
  onDishChosen: (eatTime: DishEatTime) => void;
  onCancelChosen: (eatTime: DishEatTime) => void;
  onDelete: (dishId: string) => void;
  onEdit: (dish: any) => void;
  chosenPerTime: Partial<Record<DishEatTime, Dish>>;
}

export default function DishModal({
  dish,
  onClose,
  onDishChosen,
  onCancelChosen,
  onDelete,
  onEdit,
  chosenPerTime,
}: DishModalProps) {
  const [selectedEatTime, setSelectedEatTime] = useState<DishEatTime | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDelete = () => {
    onDelete(dish._id);
    onClose();
  };

  const handleEdit = () => {
    onEdit(dish);
    onClose();
  };

  const handleChooseClick = () => {
    if (selectedEatTime) {
      onDishChosen(selectedEatTime);
      onClose();
    } else {
      setDropdownOpen((prev) => !prev);
    }
  };

  const alreadyChosenTimes = Object.entries(chosenPerTime).filter(
    ([_, d]) => d._id === dish._id
  ) as [DishEatTime, Dish][];

  return (
    <Modal isOpen={true} onClose={onClose} className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-pink-600">{dish.name}</h2>

        <img
          src={dish.imageUrl || "/default_dish.jpg"}
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

        {dish.eatTime!.length > 0 && (
          <div className="text-gray-700 mb-2">
            <span className="font-semibold text-gray-800">Fits for: </span>
            {dish.eatTime!.map((time: string, idx: number) => (
              <span
                key={idx}
                className="inline-block bg-pink-100 text-pink-700 text-sm font-medium px-2 py-1 rounded-full mr-1"
              >
                {time}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between gap-2 flex-row">
          {alreadyChosenTimes.length > 0 ? (
            <button
              onClick={() => {
                alreadyChosenTimes.forEach(([time]) => onCancelChosen(time));
                onClose();
              }}
              className="w-full text-sm text-rose-500 border border-rose-300 rounded-lg py-2 hover:bg-rose-100 transition-all"
            >
              Cancel your choice ❌
            </button>
          ) : (
            <div className="relative w-full">
              <button
                onClick={handleChooseClick}
                className="w-full text-white font-semibold py-2 px-4 rounded-xl text-center transition-all duration-200 bg-pink-500 hover:bg-pink-600"
              >
                {selectedEatTime ? `Choose for ${selectedEatTime} 🍽️` : "Choose"}
              </button>

              {dropdownOpen && !selectedEatTime && (
                <div className="absolute w-full max-h-20 overflow-y-auto bg-white border border-pink-300 rounded-xl shadow-lg z-10 animate-fadeInDropdown">
                  {dish.eatTime!.map((time: DishEatTime, idx: number) => {
                    const alreadyChosenDish = chosenPerTime[time];

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (
                            alreadyChosenDish &&
                            alreadyChosenDish._id !== dish._id
                          ) {
                            const confirmReplace = window.confirm(
                              `You have already chosen "${alreadyChosenDish.name}" for ${time}. Do you want to replace it with "${dish.name}"?`
                            );
                            if (!confirmReplace) return;
                          }

                          setSelectedEatTime(time);
                          setDropdownOpen(false);
                          onDishChosen(time);
                          onClose();
                        }}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 cursor-pointer transition-all"
                      >
                        {time}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <button
              onClick={handleEdit}
              className="flex items-center gap-1 px-3 py-2 text-sm bg-green-400 hover:bg-green-500 text-white rounded-lg"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1 px-3 py-2 text-sm bg-[rgb(255,0,0)] hover:bg-[rgb(225,0,0)] text-white rounded-lg"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
    </Modal>
  );
}