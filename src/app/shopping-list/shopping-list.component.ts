import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    console.log('this.ingredients = this.shoppingListService.getIngredients():  ' + this.ingredients);
    this.igChangeSub = this.shoppingListService.ingredientsChanged
      .subscribe(
      (ingredients: Ingredient[]) => {
        console.log('this.ingredients before the new allocation:' + this.ingredients);
        console.log('ingredients before the new allocation:' + ingredients);
        this.ingredients = ingredients;
        console.log('ingredients after the new allocation:' + ingredients);
        console.log('this.ingredients after the new allocation:' + this.ingredients);
      }
    );
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }
}
