import { Injectable } from '@angular/core';
import { BaseSelector } from '@app/modules/shared/base/base-selector.selector';
import { Actions } from '@ngrx/effects';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppActionNames } from './app.action';
import { IAppState } from './app.state';

export const appState = createFeatureSelector<IAppState>('appState');

const getTaskLayoutList = createSelector(appState, (state: IAppState) => state.taskLayoutList);
@Injectable({
    providedIn: 'root'
})
export class AppSelectors extends BaseSelector {
    public getTaskLayoutList$: Observable<any>;
    constructor(private store: Store<IAppState>, protected actions: Actions) {
        super(
            actions,
            AppActionNames.SUCCESS_ACTION,
            AppActionNames.FAILED_ACTION,
        );

        this.getTaskLayoutList$ = this.store.select(getTaskLayoutList);
    }
}
