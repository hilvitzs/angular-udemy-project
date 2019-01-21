import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DataStorageService } from '../../shared/data-storage.service';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService,
              private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe((response) => console.log(response));
      // .subscribe(
      //   (response: HttpEvent<Object>) => {
      //     console.log(response.type === HttpEventType.Response);
      //   }
      // );
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  isAuthenticated() {
    return this.store.select('auth');
  }
}
