import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskManagementComponent } from './task-management.component';
import { TaskService } from '../../services/task.service';

@NgModule({
    imports: [CommonModule],
    declarations: [TaskManagementComponent],
    exports: [TaskManagementComponent],
    providers: [TaskService],
})
export class TaskManagementModule { }
