import {Component, Input, OnInit, Output} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipesService} from "./recipes.service";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.sass'],
  providers: [RecipesService, ShoppingListService]
})
export class RecipesComponent implements OnInit {
  // selectedRecipe: Recipe;
  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    // setup the listener to be informed about the changes we don't need it anymore because we use [recipe.id] with routing.
    // this.recipesService.selectedRecipe
    //   .subscribe(
    //   (recipe: Recipe) => {
    //     this.selectedRecipe = recipe;
    //   }
    // );
  }
}
