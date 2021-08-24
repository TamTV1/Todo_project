import { Injectable } from '@angular/core';
import { BaseSelector } from '@app/modules/shared/base/base-selector.selector';
import { Actions } from '@ngrx/effects';
import { createFeatureSelector, Store } from '@ngrx/store';
import { AppActionNames } from './app.action';
import { IAppState } from './app.state';

export const appState = createFeatureSelector<IAppState>('appState');

@Injectable({
    providedIn: 'root'
})
export class AppSelectors extends BaseSelector {
    constructor(private store: Store<IAppState>, protected actions: Actions) {
        super(
            actions,
            AppActionNames.SUCCESS_ACTION,
            AppActionNames.FAILED_ACTION,
        );
    }
}
