import { Injectable } from '@angular/core';
import { CustomAction } from '@app/modules/shared/base/custom-action.model';

export enum AppActionNames {
    SUCCESS_ACTION = '[APP] Success Action',
    FAILED_ACTION = '[APP] Failed Action',

    GET_DROPDOWN_TASK_LAYOUT = '[APP] GET DROPDOWN TASK LAYOUT',
    GET_TASK_DETAIL = '[APP] GET TASK DETAIL',
    GET_TASK_BY_USER = '[APP] GET TASK BY USER',
    SAVE_TASK = '[APP] SAVE TASK',
}

@Injectable()
export class AppActionsMethod {

    public getDropdownTaskLayoutAction() {
        return {
            type: AppActionNames.GET_DROPDOWN_TASK_LAYOUT,
        };
    }
    public getTaskDetailAction(payload: any) {
        return {
            type: AppActionNames.GET_TASK_DETAIL,
            payload: payload,
        };
    }
    public getTaskByUserAction(payload: any) {
        return {
            type: AppActionNames.GET_TASK_BY_USER,
            payload: payload,
        };
    }
    public saveTaskAction(payload: any) {
        return {
            type: AppActionNames.SAVE_TASK,
            payload: payload,
        };
    }

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