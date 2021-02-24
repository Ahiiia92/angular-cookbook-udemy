import {Ingredient} from "../shared/ingredient.model";
import {FoodCategory} from "../shared/foodCategory.model";
import {Difficulty} from "../shared/difficulty.model";

export class Recipe {
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public category: FoodCategory;
  public difficulty: Difficulty;

  // constructor(id: number, name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
  //   this.id = id;
  //   this.name = name;
  //   this.description = description;
  //   this.imagePath = imagePath;
  //   this.ingredients = ingredients;
  // }
}
