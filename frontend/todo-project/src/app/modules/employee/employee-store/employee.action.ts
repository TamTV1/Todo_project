import { Injectable } from '@angular/core';
import { CustomAction } from '@app/modules/shared/base/custom-action.model';

export enum EmployeeActionNames {
    SUCCESS_ACTION = '[EMPLOYEE] Success Action',
    FAILED_ACTION = '[EMPLOYEE] Failed Action',

    GET_EMPLOYEES = '[EMPLOYEE] GET EMPLOYEES',
    GET_DETAIL_EMPLOYEES = '[EMPLOYEE] GET DETAIL EMPLOYEE',
    SAVE_EMPLOYEE = '[EMPLOYEE] SAVE EMPLOYEE',
}

@Injectable()
export class EmployeeActionsMethod {

    public getEmployeesAction(payload: any) {
        return {
            type: EmployeeActionNames.GET_EMPLOYEES,
            payload: payload,
        };
    }
    public getDetailEmployeeAction(payload: any) {
        return {
            type: EmployeeActionNames.GET_DETAIL_EMPLOYEES,
            payload: payload,
        };
    }
    public saveEmployeeAction(payload: any) {
        return {
            type: EmployeeActionNames.SAVE_EMPLOYEE,
            payload: payload,
        };
    }

    /**
     * ACTION DEFAULT
     */
    public successAction(actionType: string, payload: any): SuccessAction {
        return {
            type: EmployeeActionNames.SUCCESS_ACTION,
            subType: actionType,
            payload: payload,
        };
    }

    public failedAction(actionType: string, payload: any): FailedAction {
        return {
            type: EmployeeActionNames.FAILED_ACTION,
            subType: actionType,
            payload: payload,
        };
    }
}

export class SuccessAction implements CustomAction {
    public type = EmployeeActionNames.SUCCESS_ACTION;

    constructor(public subType: string, public payload?: any) { }
}

export class FailedAction implements CustomAction {
    public type = EmployeeActionNames.FAILED_ACTION;

    constructor(public subType: string, public payload?: any) { }
}