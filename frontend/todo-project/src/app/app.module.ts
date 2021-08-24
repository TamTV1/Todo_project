import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app-store/app.effect';
import { EmployeeEffects } from './modules/employee/employee-store/employee.effect';
import { AppActionsMethod } from './app-store/app.action';
import { AppSelectors } from './app-store/app.selector';
import { EmployeeActionsMethod } from './modules/employee/employee-store/employee.action';
import { EmployeeSelectors } from './modules/employee/employee-store/employee.selector';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { IAppState } from './app-store/app.state';
import { appReducer } from './app-store/app.reducer';
import { IEmployeeState } from './modules/employee/employee-store/employee.state';
import { employeeReducer } from './modules/employee/employee-store/employee.reducer';
import { EmployeeModule } from './modules/employee/employee.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      app: appReducer,
      employee: employeeReducer,
    } as ActionReducerMap<AppState>),
    EffectsModule.forRoot([
      AppEffects,
      EmployeeEffects,
    ]),
    EmployeeModule,
  ],
  providers: [
    AppActionsMethod,
    AppSelectors,
    EmployeeActionsMethod,
    EmployeeSelectors,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export interface AppState {
  app: IAppState;
  employee: IEmployeeState;
}