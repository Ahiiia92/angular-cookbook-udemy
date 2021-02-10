import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipesService} from "./recipes.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.sass'],
  providers: [RecipesService]
})
export class RecipesComponent implements OnInit {
  @Input() selectedRecipe: Recipe;
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
