import { CustomAction } from '@app/modules/shared/base/custom-action.model';
import { EmployeeActionNames, FailedAction, SuccessAction } from './employee.action';
import { IEmployeeState } from './employee.state';

const initialState: IEmployeeState = {};

export function employeeReducer(state = initialState, action: CustomAction): IEmployeeState {
    switch (action.type) {
        case EmployeeActionNames.SUCCESS_ACTION:
            return actionSuccessReducer(state, action as SuccessAction);

        case EmployeeActionNames.FAILED_ACTION:
            return actionFailedReducer(state, action as FailedAction);

        default:
            return state;
    }
}

function actionSuccessReducer(state: IEmployeeState, action: SuccessAction) {
    switch (action.subType) {
        default:
            return state;
    }
}

function actionFailedReducer(state: IEmployeeState, action: FailedAction) {
    switch (action.subType) {
        default:
            return state;
    }
}