import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ErrorMessageComponent],
    exports: [ErrorMessageComponent],
    providers: [],
})
export class ErrorMessageModule { }
