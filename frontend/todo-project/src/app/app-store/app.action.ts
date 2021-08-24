import { Injectable } from '@angular/core';
import { CustomAction } from '@app/modules/shared/base/custom-action.model';

export enum AppActionNames {
    SUCCESS_ACTION = '[EMPLOYEE] Success Action',
    FAILED_ACTION = '[EMPLOYEE] Failed Action',
}

@Injectable()
export class AppActionsMethod {

    /**
     * ACTION DEFAULT
     */
    public successAction(actionType: string, payload: any): SuccessAction {
        return {
            type: AppActionNames.SUCCESS_ACTION,
            subType: actionType,
            payload: payload,
        };
    }

    public failedAction(actionType: string, payload: any): FailedAction {
        return {
            type: AppActionNames.FAILED_ACTION,
            subType: actionType,
            payload: payload,
        };
    }
}

export class SuccessAction implements CustomAction {
    public type = AppActionNames.SUCCESS_ACTION;

    constructor(public subType: string, public payload?: any) { }
}

export class FailedAction implements CustomAction {
    public type = AppActionNames.FAILED_ACTION;

    constructor(public subType: string, public payload?: any) { }
}