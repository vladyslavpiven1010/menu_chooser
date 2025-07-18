export interface Dish {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
  ingredients: string[];
  createdBy: string;
  disabledByYouToday?: boolean;
  chosenToday: boolean;
}

export interface NewDish {
  name: string;
  imageUrl: string;
  description: string;
  ingredients: string[];
  createdBy: string;
}