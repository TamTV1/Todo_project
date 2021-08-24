import { NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { employeeRoutes } from './employee-routing';
import { EmployeeComponent } from './employee.component';
import { EmployeeEffects } from './employee-store/employee.effect';
import { EmployeeSelectors } from './employee-store/employee.selector';
import { employeeReducer } from './employee-store/employee.reducer';
import { EmployeeService } from '../shared/services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModifyEmployeeComponent } from './components/modify-employee/modify-employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessageModule } from '../shared/components/error-message/error-message.module';
import { XnErrorMessageHelper } from '../shared/helper/error-message.helper';
import { TaskManagementModule } from '../shared/components/task-management/task-management.module';

@NgModule({
    declarations: [EmployeeComponent, ModifyEmployeeComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(employeeRoutes),
        HttpClientModule,
        EffectsModule.forFeature([EmployeeEffects]),
        StoreModule.forFeature('employeeReducer', employeeReducer),
        NgxPaginationModule,
        NgbModule,
        ErrorMessageModule,
        TaskManagementModule,
    ],
    exports: [],
    providers: [EmployeeSelectors, EmployeeService, XnErrorMessageHelper],
})
export class EmployeeModule { }