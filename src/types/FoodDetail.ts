export interface FoodDetail {
  id: number;
  image: string;
  name: string;
  cuisine: string;
  caloriesPerServing: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  tags: string[];
  mealType: string[];
  difficulty: string;
  ingredients: string[];
  instructions: string[];
}
