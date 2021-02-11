import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipesService} from "../recipes.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass']
})
export class RecipeDetailComponent implements OnInit {
  show = false;
  recipe: Recipe;
  id: number;

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipesService.getRecipe(this.id);
        }
      );
  }

  onAddToTheShoppingList() {
    this.recipesService.addToShoppingList(this.recipe.ingredients);
  }
}
