import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppActionNames, AppActionsMethod } from '@app/app-store/app.action';
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
    @Input() userId: string;
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
        LAYOUT: <ControlData>{ controlName: 'layoutId', displayName: 'Layout' },
        IMAGE_LINK: <ControlData>{ controlName: 'imagesLink', displayName: 'Image Link' },
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

        this.appSelectors.actionSuccessOfSubtype$(AppActionNames.SAVE_TASK)
            .pipe(takeUntil(super.ngUnsubscribe()))
            .subscribe((action: CustomAction) => {
                debugger;
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
        if (this.fgData.invalid) return;

        const savedData = this.fgData.value;
        savedData['userId'] = this.userId;

        const formData = new FormData();
        if (this.files.length) {
            for (let index = 0; index < this.files.length; index++) {
                const element = this.files[index];

                formData.append("fileToUpload[]", element)
            }
        }

        // this.store.dispatch(this.appActionsMethod.saveTaskAction({ savedData, formData }));
    }

    // has some error
    // private filterValidLink(savedData: any) {
    //     let linksData = savedData[this.dataFields.IMAGE_LINK.controlName];
    //     // if is layout is image or linksData has no value
    //     if (!linksData || savedData[this.dataFields.LAYOUT.controlName] !== this.taskLayoutList[1].value) return '';

    //     const linkArray = linksData.split(',');
    //     if (!linkArray || !linkArray.length) {
    //         alert('invalid images link')
    //         linksData = '';
    //     } else {
    //         const validImgLink = [];
    //         for (let index = 0; index < linkArray.length; index++) {
    //             const element = linkArray[index];
    //             if (!this.checkValidImage(element)) continue;

    //             validImgLink.push(element);
    //         }
    //         linksData = validImgLink.toString();
    //     }
    //     return linksData;
    // }
    // private checkValidImage(url) {
    //     let isValid;
    //     var request = new XMLHttpRequest();
    //     request.open("GET", url, true);
    //     request.send();
    //     request.onload = function () {
    //         isValid = request.status == 200;
    //     }
    //     return isValid;
    // }

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