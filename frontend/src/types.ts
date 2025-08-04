export type DishEatTime = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export const EAT_TIMES: DishEatTime[] = ["breakfast", "lunch", "dinner", "snack"];

export interface Dish {
  _id: string;
  name: string;
  imageUrl?: string;
  description?: string;
  ingredients: string[];
  eatTime?: DishEatTime[];
  createdBy: string;
  disabledByYouToday?: boolean;
  chosenToday: DishEatTime | null;
}

export interface NewDish {
  name: string;
  imageUrl?: string;
  description?: string;
  ingredients: string[];
  eatTime: DishEatTime[];
  createdBy: string;
}

export interface UpdateDish {
  name?: string;
  imageUrl?: string;
  description?: string;
  ingredients?: string[];
  eatTime?: DishEatTime[];
}