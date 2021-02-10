import {Component, OnInit} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipesService} from "./recipes.service";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Ingredient} from "../shared/ingredient.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.sass'],
  providers: [RecipesService, ShoppingListService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    // setup the listener to be informed about the changes
    this.recipesService.selectedRecipe
      .subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
      }
    );
  }
}
