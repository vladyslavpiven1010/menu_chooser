import { useState, useEffect } from "react";
import { updateDish, addDish } from "../services/dishApi";
import { Dish, DishEatTime, EAT_TIMES } from "../types";
import Modal from "./Modal";

interface Props {
  onClose: () => void;
  onDishAdded: () => void;
  initialDish?: Dish | null;
}

export default function AddDishModal({ onClose, onDishAdded, initialDish }: Props) {
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    description: "",
    ingredients: "",
    createdBy: "",
  });

  const [loading, setLoading] = useState(false);
  const [eatTimes, setEatTimes] = useState<DishEatTime[]>(initialDish?.eatTime || []);

  const isEdit = !!initialDish;

  useEffect(() => {
    if (initialDish) {
      setForm({
        name: initialDish.name || "",
        imageUrl: initialDish.imageUrl || "",
        description: initialDish.description || "",
        ingredients: initialDish.ingredients?.join(", ") || "",
        createdBy: initialDish.createdBy || "",
      });

      setEatTimes(initialDish.eatTime || []);
    } else {
      const role = localStorage.getItem("role");
      if (role) {
        setForm((prev) => ({ ...prev, createdBy: role }));
      }
    }
  }, [initialDish]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, imageUrl, description, ingredients, createdBy } = form;

    if (!name || !ingredients) {
      alert("Name and ingredients fields are required");
      return;
    }

    const payload = {
      name,
      imageUrl,
      description,
      createdBy,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      eatTime: eatTimes,
    };

    setLoading(true);

    try {
      if (isEdit && initialDish) {
        await updateDish(initialDish._id, payload);
      } else {
        await addDish(payload);
      }

      onDishAdded();
      onClose();
    } catch (err) {
      console.error("Failed to submit dish:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
        <h2 className="text-xl font-bold text-center text-rose-500 mb-4">
          {isEdit ? "Edit Dish" : "Add New Dish"}
        </h2>

        <form onSubmit={handleSubmit} className="relative w-full">
          <input
            type="text"
            placeholder="Dish name"
            className="w-full box-border px-4 py-2 mb-3 border rounded-lg"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="text"
            placeholder="Image URL"
            className="w-full box-border px-4 py-2 mb-3 border rounded-lg"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />

          <textarea
            placeholder="Description"
            className="w-full box-border px-4 py-2 mb-3 border rounded-lg resize-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="text"
            placeholder="Ingredients (comma separated)"
            className="w-full box-border px-4 py-2 mb-3 border rounded-lg"
            value={form.ingredients}
            onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
          />

          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {eatTimes.map((time) => (
                <div
                  key={time}
                  className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {time}
                  <button
                    type="button"
                    className="text-rose-500 hover:text-rose-700 font-bold"
                    onClick={() => setEatTimes(eatTimes.filter((t) => t !== time))}
                  >
                    ×
                  </button>
                </div>
              ))}
              <select
                className="border px-2 py-1 rounded-lg text-sm"
                value=""
                onChange={(e) => {
                  const selected = e.target.value as DishEatTime;
                  if (selected && !eatTimes.includes(selected)) {
                    setEatTimes([...eatTimes, selected]);
                  }
                }}
              >
                <option value="">+ Add time</option>
                {EAT_TIMES
                  .filter((t) => !eatTimes.includes(t))
                  .map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg"
              disabled={loading}
            >
              {loading ? "Saving..." : isEdit ? "Update Dish" : "Add Dish"}
            </button>
          </div>
        </form>
    </Modal>
  );
}