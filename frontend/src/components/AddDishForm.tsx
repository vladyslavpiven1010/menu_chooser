import { useState } from "react";
import { addDish } from "../services/dishApi";
import { NewDish } from "../types";

interface DishCardProps {
  dish: NewDish;
  onAdd: () => void;
}

export default function AddDishForm({
  dish,
  onAdd
}: DishCardProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = form.imageUrl;

    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:3000/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        imageUrl = data.imageUrl;
      } catch (error) {
        console.error("Image upload failed", error);
      } finally {
        setUploading(false);
      }
    }

    await addDish({ ...form, imageUrl, ingredients, createdBy: "girlfriend" });
    setForm({ name: "", description: "", imageUrl: "" });
    setIngredients([]);
    setIngredientInput("");
    setFile(null);
    onAdd();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg space-y-4 max-w-lg mx-auto border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-pink-600">Add New Dish</h2>
      <input
        type="text"
        name="name"
        placeholder="Dish name"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
          placeholder="Ingredient"
          className="flex-grow border rounded p-2"
        />
        <button
          type="button"
          onClick={handleAddIngredient}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <ul className="list-disc list-inside">
        {ingredients.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full"
      />
      <button
        type="submit"
        disabled={uploading}
        className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
      >
        {uploading ? "Uploading..." : "Add Dish"}
      </button>
    </form>
  );
}
