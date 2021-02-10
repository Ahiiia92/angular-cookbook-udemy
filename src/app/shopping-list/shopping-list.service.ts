import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Grenade', 2),
    new Ingredient('Lettuce', 1),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    console.log("you're inside the shopping-list comp.");
    this.ingredients.push(...ingredients);
    console.log("added to the array");
    this.ingredientsChanged.emit(this.ingredients.slice());
    console.log("Mon array d'ingrédients dans ma shopping list:");
    console.log(this.getIngredients());
    console.log("Mes ingrédients de la recette");
    console.log(ingredients);
  }
}
