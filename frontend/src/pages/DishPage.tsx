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
import { Dish } from "../types";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSocket } from "../contexts/SocketContext";
import AddDishModal from "../components/AddDishModal";

export default function DishPage() {
  const [search, setSearch] = useState("");
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [chosenDishId, setChosenDishId] = useState<string | null>(null);
  const [role, setRole] = useState<"girlfriend" | "admin" | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { cancelledDishIds } = useSocket();

  useEffect(() => {
    const savedRole = localStorage.getItem("role") as "girlfriend" | "admin" | null;
    setRole(savedRole);
  }, []);

  const fetchDishes = async () => {
    const data = await getDishes(search);
    setDishes(data);

    const chosen = data.find((d: Dish) => d.chosenToday);
    if (chosen) setChosenDishId(chosen._id);
    else setChosenDishId(null);
  };

  const handleDishChosen = async (dishId: string) => {
    if (chosenDishId) {
      toast.info("You already chose a dish today 🍽️");
      return;
    }

    try {
      await chooseDish(dishId);
      toast.success("You chose the dish!");
      setChosenDishId(dishId);
      fetchDishes();
    } catch (err) {
      toast.error("Failed to choose dish");
      console.error(err);
    }
  };

  const handleDishCanceled = async (dishId: string) => {
    try {
      await cancelDish(dishId); 
      setChosenDishId(null);
      toast.success("Dish choice has been canceled");
    } catch (err) {
      toast.error("Failed to cancel dish choice");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, [search]);

  return (
    <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-pink-100 via-rose-50 to-yellow-50">
      <h1 className="text-3xl font-extrabold text-center text-rose-500 mb-4">
        🍓 Choose Your Breakfast
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search delicious dishes..."
          className="w-full max-w-md px-4 py-2 border-2 border-rose-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-6 right-6 bg-rose-500 hover:bg-rose-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-3xl z-50"
          title="Add Dish"
        >
          +
        </button>
        
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dishes.map((dish) => (
          <DishCard
            key={dish._id}
            dish={dish}
            onClick={() => setSelectedDish(dish)}
            onDisable={role === "admin" ? () => disableDish(dish._id).then(fetchDishes) : undefined}
            onEnable={role === "admin" ? () => enableDish(dish._id).then(fetchDishes) : undefined}
            onDelete={role === "admin" ? () => deleteDish(dish._id).then(fetchDishes) : undefined}
            chosenDishId={chosenDishId}
            cancelledDishIds={cancelledDishIds}
            showChooseField={role === "girlfriend" ? true : false}
          />
        ))}
      </div>

      {selectedDish && (
        <DishModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onDishChosen={() => handleDishChosen(selectedDish._id)}
          onCancelChosen={() => handleDishCanceled(selectedDish._id)}
          chosenDishId={chosenDishId}
        />
      )}

      {isAddModalOpen && (
        <AddDishModal
          onClose={() => setIsAddModalOpen(false)}
          onDishAdded={fetchDishes}
        />
      )}
    </div>
  );
}