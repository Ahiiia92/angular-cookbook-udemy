import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "./recipe.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.sass']
})
export class RecipesComponent implements OnInit {
  @Input() selectedRecipe: Recipe;
  constructor() { }

  ngOnInit(): void {
  }

}
