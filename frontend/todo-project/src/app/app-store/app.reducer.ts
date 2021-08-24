import { CustomAction } from '@app/modules/shared/base/custom-action.model';
import { AppActionNames, FailedAction, SuccessAction } from './app.action';
import { IAppState } from './app.state';

const initialState: IAppState = {};

export function appReducer(state = initialState, action: CustomAction): IAppState {
    switch (action.type) {
        case AppActionNames.SUCCESS_ACTION:
            return actionSuccessReducer(state, action as SuccessAction);

        case AppActionNames.FAILED_ACTION:
            return actionFailedReducer(state, action as FailedAction);

        default:
            return state;
    }
}

function actionSuccessReducer(state: IAppState, action: SuccessAction) {
    switch (action.subType) {
        default:
            return state;
    }
}

function actionFailedReducer(state: IAppState, action: FailedAction) {
    switch (action.subType) {
        default:
            return state;
    }
}