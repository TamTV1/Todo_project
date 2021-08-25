import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskManagementComponent } from './task-management.component';
import { TaskService } from '../../services/task.service';
import { ModifyTaskComponent } from './components/modify-task/modify-task.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { NgBootstrapDatetimeAngularModule } from 'ng-bootstrap-datetime-angular';


@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        ErrorMessageModule,
        NgBootstrapDatetimeAngularModule
    ],
    declarations: [TaskManagementComponent, ModifyTaskComponent],
    exports: [TaskManagementComponent],
    providers: [TaskService],
})
export class TaskManagementModule { }
