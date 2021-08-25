import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppActionsMethod } from '@app/app-store/app.action';
import { AppSelectors } from '@app/app-store/app.selector';
import { ControlData, ErrorMessageTypeEnum } from '@app/app.constant';
import { AppState } from '@app/app.module';
import { BaseComponent } from '@app/modules/shared/base/base.component';
import { CustomAction } from '@app/modules/shared/base/custom-action.model';
import { XnErrorMessageHelper } from '@app/modules/shared/helper/error-message.helper';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'modify-task',
    templateUrl: './modify-task.component.html',
    styleUrls: ['./modify-task.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyTaskComponent extends BaseComponent implements OnInit, OnDestroy {

    //#region Input / ouyput
    @Input() taskId: string;
    @Input() modal: any;
    //#endregion

    //#region form
    public ERR_MES_TYPE_ENUM = ErrorMessageTypeEnum;
    public fgData: FormGroup;
    public dataFields = {
        NAME: <ControlData>{ controlName: 'name', displayName: 'Name', validator: [Validators.required] },
        START_TIME: <ControlData>{ controlName: 'startTime', displayName: 'Start Time' },
        END_TIME: <ControlData>{ controlName: 'endTime', displayName: 'End Time' },
        DESCRIPTION: <ControlData>{ controlName: 'description', displayName: 'Description' },
        LAYOUT: <ControlData>{ controlName: 'layout', displayName: 'Layout' },
    };
    public controlDataList: ControlData[] = [
        this.dataFields.NAME,
        this.dataFields.START_TIME,
        this.dataFields.END_TIME,
        this.dataFields.DESCRIPTION,
        this.dataFields.LAYOUT,
    ];
    public taskLayoutList = [];
    //#endregion

    public modalTitle = "New Task";

    constructor(
        protected store: Store<AppState>,
        protected appActionsMethod: AppActionsMethod,
        protected appSelectors: AppSelectors,
        protected cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        public xnErrorMessageHelper: XnErrorMessageHelper,
    ) {
        super();
    }

    ngOnDestroy(): void {
        super.destroyAction()
    }
    ngOnInit(): void {
        this.onEffectAction();

        if (!!this.taskId) {
            this.modalTitle = "Update Task"
            this.store.dispatch(this.appActionsMethod.getTaskDetailAction(this.taskId));
        } else {
            this.initForm(null);
        }
    }

    private onEffectAction() {
        this.appSelectors.getTaskLayoutList$
            .pipe(takeUntil(super.ngUnsubscribe()))
            .subscribe((state) => {
                if (!state || !state.length) {
                    this.store.dispatch(this.appActionsMethod.getDropdownTaskLayoutAction());
                    return;
                }

                this.taskLayoutList = state;
                this.cdr.detectChanges();
            });
    }

    public initForm(data) {
        if (!this.controlDataList || !this.controlDataList.length) return;

        const formgroup = this.fb.group({});
        this.controlDataList.forEach(element => {
            const hasData = !!data && !!data[element.controlName];
            // const defaultValue = element.controlName === this.dataFields.IS_ACTIVE.controlName ? hasData : '';
            formgroup.addControl(element.controlName, new FormControl(hasData ? data[element.controlName] : '', element.validator));
        });

        this.fgData = formgroup;
        this.cdr.detectChanges();
    }
    public handleModifyAction() {

    }
}