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
        IMAGE_LINK: <ControlData>{ controlName: 'imageLink', displayName: 'Image Link' },
    };
    public controlDataList: ControlData[] = [
        this.dataFields.NAME,
        this.dataFields.START_TIME,
        this.dataFields.END_TIME,
        this.dataFields.DESCRIPTION,
        this.dataFields.LAYOUT,
        this.dataFields.IMAGE_LINK,
    ];
    public taskLayoutList = [];

    // image
    public files: File[] = [];
    //#endregion

    public modalTitle = "New Task";
    public btnText = "Create New";

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
            this.btnText = "Update"
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

                // wait load taskLayoutList first after that call init form 
                if (!!this.taskId) {
                    this.store.dispatch(this.appActionsMethod.getTaskDetailAction(this.taskId));
                } else {
                    this.initForm(null);
                }
            });
    }

    public initForm(data) {
        if (!this.controlDataList || !this.controlDataList.length) return;

        const defaultLayout = !!data && !!data[this.dataFields.LAYOUT.controlName] ? data[this.dataFields.LAYOUT.controlName] : this.taskLayoutList[0].value;
        const formgroup = this.fb.group({});
        this.controlDataList.forEach(element => {
            const hasData = !!data && !!data[element.controlName];
            const defaultValue = element.controlName === this.dataFields.LAYOUT.controlName ? defaultLayout : '';
            formgroup.addControl(element.controlName, new FormControl(hasData ? data[element.controlName] : defaultValue, element.validator));
        });

        this.fgData = formgroup;
        this.cdr.detectChanges();
    }
    public handleModifyAction() {

    }

    public onSelect(event) {
        if (!event || !event.addedFiles || !event.addedFiles.length) return;

        const acceptTypeImage = ["image/png", "image/jpeg", "image/jpg"];
        const maxFileSize = 8 * 1024 * 1024;
        for (let index = 0; index < event.addedFiles.length; index++) {
            const element = event.addedFiles[index];
            if (!acceptTypeImage.includes(element.type.toLowerCase())) {
                alert(`${element.name} is not image!`);
                continue;
            }

            if (element.size > maxFileSize) {
                alert(`${element.name} is more than 8Mb, please upload image has size lower 8Mb!`);
                continue;
            }

            this.files.push(element);
        }

        // maybe bugs from lib, check later
        setTimeout(() => {
            this.cdr.detectChanges()
        }, 150)
    }

    public onRemove(event) {
        this.files.splice(this.files.indexOf(event), 1);
        this.cdr.detectChanges();
    }
}