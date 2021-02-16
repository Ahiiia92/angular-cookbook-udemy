import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipesService} from "../recipes.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass']
})

export class RecipeDetailComponent implements OnInit {
  show = false;
  recipe: Recipe;
  // with backend connection
  // recipe: Observable<Recipe>;
  id: number;

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipesService.getRecipe(this.id);
          // with backend connection
          // this.recipe = this.recipesService.getARecipe(this.id);
        },
        error => console.log(error)
      );
  }

  onAddToTheShoppingList() {
    this.recipesService.addToShoppingList(this.recipe.ingredients);
    this.router.navigate(['shopping-list']);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // alternative solution:
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }
}
