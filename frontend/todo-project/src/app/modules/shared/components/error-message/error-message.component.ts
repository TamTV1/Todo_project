import { Component, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ErrorMessageTypeEnum } from '@app/app.constant';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'error-message',
    templateUrl: './error-message.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent extends BaseComponent implements OnDestroy {
    public ERROR_MES_TYPE_ENUM = ErrorMessageTypeEnum;
    public displayMessageError = '';

    @Input() fieldName: string = '';
    @Input() typeErr: ErrorMessageTypeEnum;
    @Input() errMes: string = '';

    private _condition = false;
    @Input() set condition(data: boolean) {
        this._condition = data;

        if (!this._condition) {
            this.displayMessageError = '';
            this.cdr.detectChanges();
            return;
        }

        switch (this.typeErr) {
            case ErrorMessageTypeEnum.PATTERN_EMAIL:
                this.displayMessageError = `Format email address is wrong.`;
                break;
            case ErrorMessageTypeEnum.CUSTOM_MESSAGE:
                this.displayMessageError = this.errMes;
                break;
            default:
                this.displayMessageError = `${this.fieldName} is required.`;
                break;
        }
        this.cdr.detectChanges();
    }
    get condition(): boolean {
        return this._condition;
    }

    constructor(private cdr: ChangeDetectorRef) {
        super();
    }

    ngOnDestroy(): void {
        super.destroyAction();
    }
}
