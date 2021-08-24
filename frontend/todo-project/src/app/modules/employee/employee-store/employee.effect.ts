import { Injectable } from '@angular/core';
import { CustomAction } from '@app/modules/shared/base/custom-action.model';
import { EmployeeService } from '@app/modules/shared/services/employee.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EmployeeActionNames, EmployeeActionsMethod } from './employee.action';

@Injectable()
export class EmployeeEffects {
    constructor(
        private actions$: Actions,
        protected employeeActionsMethod: EmployeeActionsMethod,
        protected employeeService: EmployeeService,
    ) { }

    @Effect()
    getEmployees$ = this.actions$.pipe(
        ofType(EmployeeActionNames.GET_EMPLOYEES),
        switchMap((action: CustomAction) => {
            return this.employeeService.getEmployee(action.payload).pipe(
                map((res) => {
                    if (!!res && res.code === 200)
                        return this.employeeActionsMethod.successAction(
                            action.type,
                            res.data,
                        );

                    const mes = !!res ? res.message : 'error';
                    return this.employeeActionsMethod.failedAction(action.type, mes);
                }),
                catchError((err) =>
                    of(this.employeeActionsMethod.failedAction(action.type, err)),
                ),
            );
        }),
    );

    @Effect()
    getDetailEmployee$ = this.actions$.pipe(
        ofType(EmployeeActionNames.GET_DETAIL_EMPLOYEES),
        switchMap((action: CustomAction) => {
            return this.employeeService.getDetailEmployee(action.payload).pipe(
                map((res) => {
                    if (!!res && res.code === 200)
                        return this.employeeActionsMethod.successAction(
                            action.type,
                            res.data,
                        );

                    const mes = !!res ? res.message : 'error';
                    return this.employeeActionsMethod.failedAction(action.type, mes);
                }),
                catchError((err) =>
                    of(this.employeeActionsMethod.failedAction(action.type, err)),
                ),
            );
        }),
    );

    @Effect()
    saveEmployee$ = this.actions$.pipe(
        ofType(EmployeeActionNames.SAVE_EMPLOYEE),
        switchMap((action: CustomAction) => {
            return this.employeeService.saveEmployee(action.payload).pipe(
                map((res) => {
                    if (!!res && res.code === 200)
                        return this.employeeActionsMethod.successAction(
                            action.type,
                            res.data,
                        );

                    const mes = !!res ? res.message : 'error';
                    return this.employeeActionsMethod.failedAction(action.type, mes);
                }),
                catchError((err) =>
                    of(this.employeeActionsMethod.failedAction(action.type, err)),
                ),
            );
        }),
    );
}