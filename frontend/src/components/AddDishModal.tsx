import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { addDish } from "../services/dishApi";

interface Props {
  onClose: () => void;
  onDishAdded: () => void;
}

export default function AddDishModal({ onClose, onDishAdded }: Props) {
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    description: "",
    ingredients: "",
    createdBy: "",
    });
  const [loading, setLoading] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const storedId = localStorage.getItem("role");
    if (storedId) {
      setForm((prev) => ({ ...prev, createdBy: storedId }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const createdBy = localStorage.getItem("role") || 'admin';

    const { name, imageUrl, description, ingredients } = form;

    if (!name || !imageUrl || !description || !ingredients) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await addDish({
        name,
        imageUrl,
        description,
        createdBy,
        ingredients: form.ingredients.split(",").map((i) => i.trim()),
      });

      onDishAdded();
      onClose();
    } catch (err) {
      console.error("Failed to add dish:", err);
      alert("Failed to add dish");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative animate-fadeIn box-border">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-center text-rose-500 mb-4">Add New Dish</h2>

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

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg"
            >
              Add Dish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}