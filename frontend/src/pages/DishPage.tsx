import { useEffect, useState } from "react";
import {
  getDishes,
  disableDish,
  enableDish,
  deleteDish,
  chooseDish,
  cancelDish,
} from "../services/dishApi";
import DishCard from "../components/DishCard";
import DishModal from "../components/DishModal";
import { Dish, DishEatTime, EAT_TIMES } from "../types";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSocket } from "../contexts/SocketContext";
import AddDishModal from "../components/AddDishModal";

export default function DishPage() {
  const [search, setSearch] = useState("");
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [role, setRole] = useState<"girlfriend" | "admin" | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editDish, setEditDish] = useState<Dish | null>(null);
  const [selectedEatTimes, setSelectedEatTimes] = useState<string[]>([]);
  const [chosenPerTime, setChosenPerTime] = useState<Partial<Record<DishEatTime, Dish>>>({});
  const { cancelledDishIds } = useSocket();
  const [showOnlyChosenToday, setShowOnlyChosenToday] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem("role") as "girlfriend" | "admin" | null;
    setRole(savedRole);
  }, []);

  const fetchDishes = async () => {
    const allDishes = await getDishes(search);
    const chosenMap: Partial<Record<DishEatTime, Dish>> = {};
    allDishes.forEach((d: Dish) => {
      if (d.chosenToday) {
        chosenMap[d.chosenToday] = d;
      }
    });
    setChosenPerTime(chosenMap);

    const filtered = allDishes.filter((d: Dish) => {
      const eatTimeMatch = selectedEatTimes.length
        ? d.eatTime?.some((t: string) => selectedEatTimes.includes(t))
        : true;
      const chosenTodayMatch = showOnlyChosenToday ? d.chosenToday !== null : true;
      return eatTimeMatch && chosenTodayMatch;
    });

    setDishes(filtered);
  };

  const toggleEatTime = (time: string) => {
    setSelectedEatTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleDishChosen = async (dishId: string, eatTime: DishEatTime) => {
    try {
      await chooseDish(dishId, eatTime);
      toast.success(`Chosen for ${eatTime}!`);
      fetchDishes();
    } catch (err: any) {
      toast.error("Failed to choose dish");
      console.error(err);
    }
  };

  const handleDishCanceled = async (dishId: string) => {
    try {
      await cancelDish(dishId);
      toast.success("Dish choice canceled");
      fetchDishes();
    } catch (err) {
      toast.error("Failed to cancel dish");
      console.error(err);
    }
  };

  const handleDeleteDish = async (dishId: string) => {
    try {
      await deleteDish(dishId);
      toast.success("Dish deleted!");
      setSelectedDish(null);
      fetchDishes();
    } catch (err) {
      toast.error("Failed to delete dish");
      console.error(err);
    }
  };

  const handleEditDish = (dish: Dish) => {
    setEditDish(dish);
    setSelectedDish(null);
    setIsAddModalOpen(true);
  };

  useEffect(() => {
    fetchDishes();
  }, [search, selectedEatTimes, showOnlyChosenToday]);

  return (
    <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-pink-100 via-rose-50 to-yellow-50">
      <h1 className="text-3xl font-extrabold text-center text-rose-500 mb-4">
        🍓 Choose Your Dishes 🍓
      </h1>

      <div className="flex flex-col items-center mb-6">
        <input
          type="text"
          placeholder="Search delicious dishes..."
          className="w-full max-w-md px-4 py-2 mb-4 border-2 border-rose-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2 flex-wrap justify-center mb-2">
          {EAT_TIMES.map((time) => (
            <button
              key={time}
              onClick={() => toggleEatTime(time)}
              className={`px-3 py-1 rounded-full border text-sm capitalize ${
                selectedEatTimes.includes(time)
                  ? "bg-rose-500 text-white border-rose-500"
                  : "bg-white text-rose-500 border-rose-300"
              } hover:bg-rose-100`}
            >
              {time}
            </button>
          ))}

          <button
            onClick={() => setShowOnlyChosenToday(!showOnlyChosenToday)}
            className={`px-3 py-1 rounded-full border text-sm ${
              showOnlyChosenToday
                ? "bg-green-500 text-white border-green-500"
                : "bg-white text-green-500 border-green-300"
            } hover:bg-green-100`}
          >
            Showing Chosen
          </button>
        </div>
      </div>

      {role === "admin" && (
        <button
          onClick={() => {
            setEditDish(null);
            setIsAddModalOpen(true);
          }}
          className="fixed bottom-6 right-6 bg-rose-500 hover:bg-rose-600 text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center text-4xl z-50"
          title="Add Dish"
        >
          +
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dishes.map((dish) => (
          <DishCard
            key={dish._id}
            dish={dish}
            onClick={() => setSelectedDish(dish)}
            onDisable={role === "admin" ? () => disableDish(dish._id).then(fetchDishes) : undefined}
            onEnable={role === "admin" ? () => enableDish(dish._id).then(fetchDishes) : undefined}
            cancelledDishIds={cancelledDishIds}
            chosenPerTime={chosenPerTime}
          />
        ))}
      </div>

      {selectedDish && (
        <DishModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onDishChosen={(eatTime) => handleDishChosen(selectedDish._id, eatTime)}
          onCancelChosen={() => handleDishCanceled(selectedDish._id)}
          chosenPerTime={chosenPerTime}
          onDelete={() => handleDeleteDish(selectedDish._id)}
          onEdit={() => handleEditDish(selectedDish)}
        />
      )}

      {isAddModalOpen && (
        <AddDishModal
          onClose={() => {
            setIsAddModalOpen(false);
            setEditDish(null);
          }}
          onDishAdded={() => {
            fetchDishes();
            setSelectedDish(null);
          }}
          initialDish={editDish}
        />
      )}
    </div>
  );
}