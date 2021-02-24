import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipesService} from "../recipes.service";
import {Recipe} from "../recipe.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FoodCategory} from "../../shared/foodCategory.model";
import {Difficulty} from "../../shared/difficulty.model";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.sass']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  recipe: Recipe = new Recipe();
  recipeToUpdate: Recipe;
  // it assume we are creating an new recipe and we are not in editMode.
  editMode = false;
  submitted = false;
  ingredients = ['banane', 'salade'];
  editForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
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

    this.editForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'imagePath': new FormControl(null, Validators.required)
    })

    // if we are in editing mode, we want to the existing filled in in the form
    if(this.editMode) {
      this.recipesService.getARecipe(this.id)
        .pipe(first())
        .subscribe(
          res => this.editForm.patchValue(res)
        );
    }
  }

  // convenience to go back to the /recipes URL.
  goToList() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit() {
    console.log(this.editForm);
    this.submitted = true;
    if(this.editMode) {
      this.update();
    } else  {
      this.create();
    }
    this.goToList();
  }

  // ============ Creating a new Recipe ============
  create() {
    this.recipesService.createRecipe(this.recipe)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          console.log('Form: ' + this.editForm);
          console.log('Recipe: ' + this.recipe);
          this.recipe = this.editForm.value;
          this.goToList();
        }, error => {
          console.log(error.message);
        }
      );
  }



  // ============ Updating a Recipe ============
  update() {
    this.recipesService.updateRecipe(this.id, this.recipeToUpdate)
      .pipe(first())
      .subscribe(
      data => {
        console.log(data);
        console.log('Form: ' + this.editForm);
        console.log('Recipe: ' + this.recipe);
        console.log('RecipeToUpdate: ' + this.recipeToUpdate);
        this.recipeToUpdate = this.editForm.value;
        this.goToList();
      }, error => {
        console.log(error);
      }
    )
  }

}
