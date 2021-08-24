import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/employee/employee.module').then((module) => module.EmployeeModule),
    data: { preload: true }, // preload in background to be ready to use when user navigates to this route
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
