import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipesService} from "../recipes.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass']
})

export class RecipeDetailComponent implements OnInit, OnDestroy {
  show = false;
  recipe: Recipe;
  id: number;
  private recipeChangedSub: Subscription;

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];

          // with backend connection, we need initialize a new Recipe and use Su
          this.recipe = new Recipe();
          this.recipeChangedSub = this.recipesService.getARecipe(this.id)
            .subscribe(
              data => {
                console.log(data);
                this.recipe = data;
              }, error => {
                console.log(error.message);
              }
            );
        },
        error => {
          console.log(error.message);
        }
      );
  }

  ngOnDestroy() {
    this.recipeChangedSub.unsubscribe();
  }


  onAddToTheShoppingList() {
    console.log(this.recipe);
    this.recipesService.addToShoppingList(this.recipe["ingredients"]);
    this.router.navigate(['shopping-list']);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeletRecipe(id: number) {
    this.recipesService.deleteRecipe(id)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['../'], {relativeTo: this.route});
          alert('Recipe deleted!');
        }, error => {
          console.log(error.message);
        }
      );
  }
}
