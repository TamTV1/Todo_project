import { ValidatorFn } from '@angular/forms';

export const API_SERVICE = {
    API_URL: `https://localhost:44309/api`,
}


export const PAGINATION_CONSTANT = {
    PAGE_INDEX: 1,
    PAGE_SIZE: 10,
}
export const PAGE_SIZE_LIST = [
    PAGINATION_CONSTANT.PAGE_SIZE,
    50,
    100
];
export class PaginationMdel {
    pageIndex: number;
    pageSize: number;
    searchKey: string;

    constructor(index: number, size: number, key: string) {
        this.pageIndex = index;
        this.pageSize = size;
        this.searchKey = key;
    }
}

export const ValidatorPattern = {
    EMAIL: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$',
};
export class ControlData {
    controlName: string;
    displayName: string;
    placeholder?: string;
    validator?: ValidatorFn[];
}
export enum ErrorMessageTypeEnum {
    REQUIRED,
    PATTERN_EMAIL,
    CUSTOM_MESSAGE,
}