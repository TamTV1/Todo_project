import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskManagementComponent } from './task-management.component';

@NgModule({
    imports: [CommonModule],
    declarations: [TaskManagementComponent],
    exports: [TaskManagementComponent],
    providers: [],
})
export class TaskManagementModule { }
