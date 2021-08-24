import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'task-management',
    templateUrl: './task-management.component.html',
    styleUrls: ['./task-management.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskManagementComponent extends BaseComponent implements OnInit, OnDestroy {
    constructor() {
        super();
    }
    ngOnDestroy(): void {
        super.destroyAction();
    }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
}