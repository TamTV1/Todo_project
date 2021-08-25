import { Injectable } from '@angular/core';
import { BaseSelector } from '@app/modules/shared/base/base-selector.selector';
import { Actions } from '@ngrx/effects';
import { createFeatureSelector, Store } from '@ngrx/store';
import { EmployeeActionNames } from './employee.action';
import { IEmployeeState } from './employee.state';

export const employeeState = createFeatureSelector<IEmployeeState>('employee');

@Injectable({
    providedIn: 'root'
})
export class EmployeeSelectors extends BaseSelector {
    constructor(private store: Store<IEmployeeState>, protected actions: Actions) {
        super(
            actions,
            EmployeeActionNames.SUCCESS_ACTION,
            EmployeeActionNames.FAILED_ACTION,
        );
    }
}
