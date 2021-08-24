import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlData, ErrorMessageTypeEnum, ValidatorPattern } from '@app/app.constant';
import { AppState } from '@app/app.module';
import { BaseComponent } from '@app/modules/shared/base/base.component';
import { CustomAction } from '@app/modules/shared/base/custom-action.model';
import { XnErrorMessageHelper } from '@app/modules/shared/helper/error-message.helper';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { EmployeeActionNames, EmployeeActionsMethod } from '../../employee-store/employee.action';
import { EmployeeSelectors } from '../../employee-store/employee.selector';

@Component({
    selector: 'modify-employee',
    templateUrl: './modify-employee.component.html',
    styleUrls: ['./modify-employee.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyEmployeeComponent extends BaseComponent implements OnInit, OnDestroy {

    //#region INPUT - OUTPUT
    @Input() empId: string;
    @Input() modal: any;
    //#endregion

    //#region tab
    @ViewChild('tabset', { static: true }) tabset: any;
    public tabsId = {
        info: 'infoTab',
        task: 'taskTab',
    };
    public currentTabId = this.tabsId.info;
    //#endregion

    //#region form
    public ERR_MES_TYPE_ENUM = ErrorMessageTypeEnum;
    public fgData: FormGroup;
    public dataFields = {
        NAME: <ControlData>{ controlName: 'name', displayName: 'Name', validator: [Validators.required] },
        EMAIL: <ControlData>{ controlName: 'email', displayName: 'Email', validator: [Validators.required, Validators.pattern(ValidatorPattern.EMAIL)] },
        PHONE: <ControlData>{ controlName: 'phone', displayName: 'Phone' },
        POSITION: <ControlData>{ controlName: 'position', displayName: 'Position' },
        IS_ACTIVE: <ControlData>{ controlName: 'isActive', displayName: 'Enable' },
    };
    public controlDataList: ControlData[] = [
        this.dataFields.NAME,
        this.dataFields.EMAIL,
        this.dataFields.PHONE,
        this.dataFields.POSITION,
        this.dataFields.IS_ACTIVE,
    ];
    //#endregion

    public modalTitle = "New Employee";

    constructor(
        protected store: Store<AppState>,
        protected employeeActionsMethod: EmployeeActionsMethod,
        protected employeeSelectors: EmployeeSelectors,
        protected cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        public xnErrorMessageHelper: XnErrorMessageHelper,
    ) {
        super();
    }

    ngOnDestroy(): void {
        super.destroyAction();
    }
    ngOnInit(): void {
        this.onEffectAction();

        if (!!this.empId) {
            this.modalTitle = "Update Employee";
            this.store.dispatch(this.employeeActionsMethod.getDetailEmployeeAction(this.empId));
        } else {
            this.initForm(null);
        }
    }

    private onEffectAction() {
        this.employeeSelectors.actionSuccessOfSubtype$(EmployeeActionNames.GET_DETAIL_EMPLOYEES)
            .pipe(takeUntil(super.ngUnsubscribe()))
            .subscribe((action: CustomAction) => {
                const data = action.payload;
                if (!data || !data.id) return;

                this.initForm(data);
            });
        this.employeeSelectors.actionSuccessOfSubtype$(EmployeeActionNames.SAVE_EMPLOYEE)
            .pipe(takeUntil(super.ngUnsubscribe()))
            .subscribe((action: CustomAction) => {
                const data = action.payload;
                if (!data || !data.id) return;

                this.empId = data.id;
                // next to task
                this.moveToTab(this.tabsId.task);
                this.cdr.detectChanges();
            });
    }

    public initForm(data) {
        if (!this.controlDataList || !this.controlDataList.length) return;

        const formgroup = this.fb.group({});
        this.controlDataList.forEach(element => {
            const hasData = !!data && !!data[element.controlName];
            const defaultValue = element.controlName === this.dataFields.IS_ACTIVE.controlName ? hasData : '';
            formgroup.addControl(element.controlName, new FormControl(hasData ? data[element.controlName] : defaultValue, element.validator));
        });

        this.fgData = formgroup;
        this.cdr.detectChanges();
    }

    public handleModifyAction() {
        if (this.fgData.invalid) return;

        const savedData = this.fgData.value;
        if (this.empId) savedData.id = this.empId;

        this.store.dispatch(this.employeeActionsMethod.saveEmployeeAction(savedData));
    }

    public closeModal() {
        this.modal.dismiss('close')
    }
    public moveToTab(tabId) {
        this.currentTabId = tabId;
        this.cdr.detectChanges();
        this.tabset.select(this.currentTabId);
        this.cdr.detectChanges();

    }
}