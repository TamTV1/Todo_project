import { NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { employeeRoutes } from './employee-routing';
import { EmployeeComponent } from './employee.component';
import { EmployeeEffects } from './employee-store/employee.effect';
import { EmployeeSelectors, employeeState } from './employee-store/employee.selector';
import { employeeReducer } from './employee-store/employee.reducer';
import { EmployeeService } from '../shared/services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    declarations: [EmployeeComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(employeeRoutes),
        HttpClientModule,
        EffectsModule.forFeature([EmployeeEffects]),
        StoreModule.forFeature('employeeReducer', employeeReducer),
        NgxPaginationModule,
    ],
    exports: [],
    providers: [EmployeeSelectors, EmployeeService],
})
export class EmployeeModule { }