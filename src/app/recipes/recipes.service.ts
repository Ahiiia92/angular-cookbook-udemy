import { Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  // ================================ WITHOUT BACKEND CONNECTION ====================================
  // constructor(private shoppingListService: ShoppingListService) {
  // }
  //
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     1,
  //     'Tiramisù',
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor condimentum lacinia quis vel eros donec ac odio.',
  //     'https://images.unsplash.com/photo-1542124948-dc391252a940?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80',
  //     [
  //       new Ingredient("Mascarpone", 1),
  //       new Ingredient("Cacao", 1)
  //     ]),
  //   new Recipe(
  //     2,
  //     'Soup',
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu ac tortor dignissim convallis aenean et tortor. Quisque sagittis purus sit amet volutpat consequat mauris nunc.',
  //     'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80',
  //     [
  //       new Ingredient("Potatoes",3),
  //       new Ingredient("Carots", 2),
  //       new Ingredient("Leek", 1)
  //     ])
  // ];
  //
  // // constructor(private shoppingListService: ShoppingListService) { }
  //
  // // We need slice to get a copy of the array itself, and we really can't have access to our original array define above. So it's really private.
  // getRecipes() {
  //   return this.recipes.slice();
  // }
  //
  // getRecipe(id: number) {
  //   for (let recipe of this.recipes) {
  //      if (recipe['id'] == id) {
  //        console.log(recipe);
  //        return recipe;
  //      }
  //   }
  //   // return this.recipes[id];
  // }
  //

  // ================================ WITH BACKEND CONNECTION ====================================
  // Tell Angular to fetch the local on which runs our backend for the Recipes RestController:
  private baseUrl = `${environment.apiUrl}`;

  constructor(private shoppingListService: ShoppingListService,
              private http: HttpClient) {}

              recipes: Observable<Recipe>;

  getARecipe(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes/${id}`);
  }

  getRecipeList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createRecipe(recipe: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, recipe);
  }

  updateRecipe(id: number, recipe: Object): Observable<Object> {
    return  this.http.put(`${this.baseUrl}/recipes/${id}`, recipe);
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/recipes/${id}`, {responseType: 'text'});
  }
  // ================================ Services Methods Independent of backend ====================================
  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
    // for(let i of ingredients) {
    //   this.shoppingListService.addIngredient(i);
    // }
  }
}
