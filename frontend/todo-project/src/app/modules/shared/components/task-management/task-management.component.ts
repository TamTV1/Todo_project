import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AppActionNames, AppActionsMethod } from '@app/app-store/app.action';
import { AppSelectors } from '@app/app-store/app.selector';
import { AppState } from '@app/app.module';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../base/base.component';
import { CustomAction } from '../../base/custom-action.model';

@Component({
    selector: 'task-management',
    templateUrl: './task-management.component.html',
    styleUrls: ['./task-management.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskManagementComponent extends BaseComponent implements OnInit, OnDestroy {
    //#region Input / Output
    @Input() empId: string
    @Output() dolaterAction = new EventEmitter<any>();
    @Output() backToInfoAction = new EventEmitter<any>();
    //#endregion

    public empIdState: string;
    public taskData = [];

    constructor(
        protected store: Store<AppState>,
        protected appActionsMethod: AppActionsMethod,
        protected appSelectors: AppSelectors,
        protected cdr: ChangeDetectorRef,) {
        super();
    }
    ngOnDestroy(): void {
        super.destroyAction();
    }
    ngOnInit(): void {
        // if null or same id in state
        if (!this.empId || this.empId === this.empIdState) return;

        this.empIdState = this.empId;
        this.store.dispatch(this.appActionsMethod.getTaskByUser(this.empId))

        this.onEffectAction();
    }
    private onEffectAction() {
        this.appSelectors.actionSuccessOfSubtype$(AppActionNames.GET_TASK_BY_USER)
            .pipe(takeUntil(super.ngUnsubscribe()))
            .subscribe((action: CustomAction) => {
                const data = action.payload;
                if (!data) return;

                this.taskData = data;
                this.cdr.detectChanges();
            });
    }

    public handleDoLater() {
        this.dolaterAction.emit();
    }
    public handleBackToInfo() {
        this.backToInfoAction.emit();
    }
}