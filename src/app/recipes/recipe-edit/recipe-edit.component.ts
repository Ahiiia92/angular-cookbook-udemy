import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {RecipesService} from "../recipes.service";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.sass']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  recipe: Recipe;
  // it assume we are creating an new recipe and we are not in editMode.
  editMode = false;

  constructor(private route: ActivatedRoute,
              private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          // assign a new value: does params has an id property ? if it doesn't, it means it's a new recipe. We are in new mode.
          this.editMode = params['id'] != null;
        }
      )
  }

  updateRecipe() {
    this.recipesService.updateRecipe(this.id, this.recipe).subscribe(
      data => {
        console.log(data);
      }
    )
  }

  onSubmit() {
  }

}
