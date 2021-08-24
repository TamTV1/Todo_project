import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class XnErrorMessageHelper {
    public isRequired(formgroup: FormGroup, controlName: string): boolean {
        if (!controlName) return true;

        return (
            (formgroup.controls[controlName].dirty || formgroup.controls[controlName].touched) &&
            formgroup.controls[controlName].errors &&
            formgroup.controls[controlName].errors.required
        );
    }

    public isInvalidPattern(formgroup: FormGroup, controlName: string): boolean {
        if (!controlName) return true;

        return formgroup.controls[controlName].touched && formgroup.get(controlName).hasError('pattern');
    }
}