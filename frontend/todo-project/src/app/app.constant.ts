export const API_SERVICE = {
    API_URL: `https://localhost:44309/api`,
}


export const PAGINATION_CONSTANT = {
    PAGE_INDEX: 1,
    PAGE_SIZE: 10,
}
export const PAGE_SIZE_LIST = [
    PAGINATION_CONSTANT.PAGE_SIZE,
    30,
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