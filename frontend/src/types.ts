export type DishEatTime = 'breakfast' | 'lunch' | 'dinner' | 'supper';

export interface Dish {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
  ingredients: string[];
  eatTime: DishEatTime[];
  createdBy: string;
  disabledByYouToday?: boolean;
  chosenToday: boolean;
}

export interface NewDish {
  name: string;
  imageUrl: string;
  description: string;
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