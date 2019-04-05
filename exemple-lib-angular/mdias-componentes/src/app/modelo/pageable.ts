export class Pageable <T> {
    public content: Array<T> = [];
    public last = false;
    public totalPages = 0;
    public totalElements = 0;
    public first = false;
    public sort = '';
    public numberOfElements = 0;
    public size = 0 ;
    public number = 0;
    constructor(init: Partial<Pageable<T>> = null) {
      Object.assign(this, init);
    }
}
