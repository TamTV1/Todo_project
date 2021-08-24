import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PAGE_SIZE_LIST, PaginationMdel, PAGINATION_CONSTANT } from '@app/app.constant';
import { AppState } from '@app/app.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../shared/base/base.component';
import { CustomAction } from '../shared/base/custom-action.model';
import { EmployeeActionNames, EmployeeActionsMethod } from './employee-store/employee.action';
import { EmployeeSelectors } from './employee-store/employee.selector';

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent extends BaseComponent implements OnInit, OnDestroy {

    //#region define filter, data of table
    public filterParams: PaginationMdel = new PaginationMdel(PAGINATION_CONSTANT.PAGE_INDEX, PAGINATION_CONSTANT.PAGE_SIZE, '')
    public pageSizeList = PAGE_SIZE_LIST;
    public searchKeyChanged = new Subject<string>();

    public employeeData = [];
    public employeeTotal = 0;
    //#endregion

    //#region modal
    public modifyEmpId = '';
    //#endregion

    constructor(
        protected store: Store<AppState>,
        protected employeeActionsMethod: EmployeeActionsMethod,
        protected employeeSelectors: EmployeeSelectors,
        protected cdr: ChangeDetectorRef,
        private modalService: NgbModal,
    ) {
        super();
    }

    ngOnDestroy(): void {
        super.destroyAction();
    }
    ngOnInit(): void {
        this.getEmployees();

        this.onEffectAction();
    }
    private onEffectAction() {
        this.employeeSelectors.actionSuccessOfSubtype$(EmployeeActionNames.GET_EMPLOYEES)
            .pipe(takeUntil(super.ngUnsubscribe()))
            .subscribe((action: CustomAction) => {
                const data = action.payload;
                if (!data) return;

                this.employeeData = data.items;
                this.employeeTotal = data.totalItems;
                this.cdr.detectChanges();
            });
        this.searchKeyChanged
            .pipe(
                debounceTime(350))
            .subscribe(() => {
                this.getEmployees();
            })
    }

    private getEmployees() {
        this.store.dispatch(this.employeeActionsMethod.getEmployeesAction(this.filterParams));
    }
    public handleSearchData() {
        this.searchKeyChanged.next();
    }
    public handlePageChange($event) {
        this.filterParams.pageIndex = $event;
        this.getEmployees();
    }
    public handlePageSizeChange($event) {
        this.filterParams.pageSize = $event.target.value;
        this.filterParams.pageIndex = PAGINATION_CONSTANT.PAGE_INDEX;
        this.getEmployees();
    }

    public handleModifyEmployee(id: string = '', content: any) {
        this.modifyEmpId = id;

        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then((result) => {
            console.log(result);
            this.getEmployees();
        }, (reason) => {
            console.log(reason);
            this.getEmployees();
        });

        this.cdr.detectChanges();
    }
}