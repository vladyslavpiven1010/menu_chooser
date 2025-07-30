import { Dish, NewDish } from "../types";

const baseUrl = "http://192.168.1.195:3000";

export const getDishes = async (search = "") => {
  const res = await fetch(`${baseUrl}/dishes?search=${search}`);
  return res.json();
};

export async function addDish(dish: NewDish): Promise<Dish> {
  const res = await fetch(`${baseUrl}/dishes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dish),
  });
  return res.json();
}

export const updateDish = async (dishId: string, data: any) => {
  const res = await fetch(`${baseUrl}/dishes/${dishId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update dish");

  return res.json();
};

export const deleteDish = async (id: string) => {
  await fetch(`${baseUrl}/dishes/${id}`, { method: "DELETE" });
};

export const chooseDish = async (id: string) => {
  await fetch(`${baseUrl}/dishes/${id}/choose`, { method: "POST" });
};

export const cancelDish = async (id: string) => {
  await fetch(`${baseUrl}/dishes/${id}/cancel`, { method: "POST" });
};

export const disableDish = async (id: string) => {
  await fetch(`${baseUrl}/dishes/${id}/disable`, { method: "POST" });
};

export const enableDish = async (id: string) => {
  await fetch(`${baseUrl}/dishes/${id}/enable`, { method: "POST" });
};
