import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipesService} from "../recipes.service";
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  submitted = false;
  ingredients = ['banane', 'salade'];
  editForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
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
      'imagePath': new FormControl(null, Validators.required),
      'ingredient': new FormControl('salade')
    })
  }

  goToList() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // ============ Creating a new Recipe ============
  newRecipe(): void {
    this.submitted = false;
    this.recipe = new Recipe();
  }

  create() {
    this.recipesService.createRecipe(this.recipe)
      .subscribe(
        data => {
          console.log(data);
          this.recipe = new Recipe();
          this.goToList();
        }, error => {
          console.log(error.message);
        }
      );
  }

  onSubmit() {
    console.log(this.editForm);
    this.submitted = true;
    if(this.editMode) {
      this.update();
    } else  {
      this.create();
    }
  }

  // ============ Updating a Recipe ============
  update() {
    this.recipesService.updateRecipe(this.id, this.recipe).subscribe(
      data => {
        console.log(data);
        this.recipe = new Recipe();
        this.goToList();
      }, error => {
        console.log(error.message);
      }
    )
  }

}
