import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor(
              // private http: Http,
              private httpClient: HttpClient,
              private recipeService: RecipeService ) {}

  storeRecipes() {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer afslkdjfa;slkdjf').append() // won't work with firebase
    // return this.http.put('https://ng-recipe-app-d3fc7.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    // return this.httpClient.put('https://ng-recipe-app-d3fc7.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    //   // headers: headers || new HttpHeaders().set('Authorization', 'Bearer afslkdjfa;slkdjf').append() // won't work with firebase
    //   // observe: 'events'
    // });
    const req = new HttpRequest(
        'PUT',
        'https://ng-recipe-app-d3fc7.firebaseio.com/recipes.json',
        this.recipeService.getRecipes(),
        {reportProgress: true}
      );
    return this.httpClient.request(req);
  }

  fetchRecipes() {
    // this.http.get('https://ng-recipe-app-d3fc7.firebaseio.com/recipes.json?auth=' + token)
    //   .map((response: Response) => {
    //       const recipes: Recipe[] = response.json();
    //       for (const recipe of recipes) {
    //         if (!recipe['ingredients']) {
    //           recipe['ingredients'] = [];
    //         }
    //       }
    //       return recipes;
    //     })
    //   .subscribe(
    //     (recipes: Recipe[]) => {
    //       this.recipeService.setRecipes(recipes);
    //     }
    //   );
    // this.httpClient.get<Recipe[]>('https://ng-recipe-app-d3fc7.firebaseio.com/recipes.json?auth=' + token)
    this.httpClient.get<Recipe[]>('https://ng-recipe-app-d3fc7.firebaseio.com/recipes.json', {
      observe: 'body', // default
      responseType: 'json' // default
    })
      .map((recipes) => {
        console.log(recipes);
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        })
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
