import { Injectable } from '@angular/core';
import { CustomAction } from '@app/modules/shared/base/custom-action.model';
import { TaskService } from '@app/modules/shared/services/task.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppActionNames, AppActionsMethod } from './app.action';

@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        protected appActionsMethod: AppActionsMethod,
        protected taskService: TaskService,
    ) { }

    @Effect()
    getDropdownTaskLayout$ = this.actions$.pipe(
        ofType(AppActionNames.GET_DROPDOWN_TASK_LAYOUT),
        switchMap((action: CustomAction) => {
            return this.taskService.getDropdownTaskLayout().pipe(
                map((res) => {
                    if (!!res && res.code === 200)
                        return this.appActionsMethod.successAction(
                            action.type,
                            res.data,
                        );

                    const mes = !!res ? res.message : 'error';
                    return this.appActionsMethod.failedAction(action.type, mes);
                }),
                catchError((err) =>
                    of(this.appActionsMethod.failedAction(action.type, err)),
                ),
            );
        }),
    );

    @Effect()
    getTaskDetail$ = this.actions$.pipe(
        ofType(AppActionNames.GET_TASK_DETAIL),
        switchMap((action: CustomAction) => {
            return this.taskService.getTaskDetail(action.payload).pipe(
                map((res) => {
                    if (!!res && res.code === 200)
                        return this.appActionsMethod.successAction(
                            action.type,
                            res.data,
                        );

                    const mes = !!res ? res.message : 'error';
                    return this.appActionsMethod.failedAction(action.type, mes);
                }),
                catchError((err) =>
                    of(this.appActionsMethod.failedAction(action.type, err)),
                ),
            );
        }),
    );

    @Effect()
    getTaskByUser$ = this.actions$.pipe(
        ofType(AppActionNames.GET_TASK_BY_USER),
        switchMap((action: CustomAction) => {
            return this.taskService.getTaskByUser(action.payload).pipe(
                map((res) => {
                    if (!!res && res.code === 200)
                        return this.appActionsMethod.successAction(
                            action.type,
                            res.data,
                        );

                    const mes = !!res ? res.message : 'error';
                    return this.appActionsMethod.failedAction(action.type, mes);
                }),
                catchError((err) =>
                    of(this.appActionsMethod.failedAction(action.type, err)),
                ),
            );
        }),
    );

    @Effect()
    saveTask$ = this.actions$.pipe(
        ofType(AppActionNames.SAVE_TASK),
        switchMap((action: CustomAction) => {
            return this.taskService.saveTask(action.payload).pipe(
                map((res) => {
                    if (!!res && res.code === 200)
                        return this.appActionsMethod.successAction(
                            action.type,
                            res.data,
                        );

                    const mes = !!res ? res.message : 'error';
                    return this.appActionsMethod.failedAction(action.type, mes);
                }),
                catchError((err) =>
                    of(this.appActionsMethod.failedAction(action.type, err)),
                ),
            );
        }),
    );
}