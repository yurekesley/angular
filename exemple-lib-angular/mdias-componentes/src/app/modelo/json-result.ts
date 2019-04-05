export class JsonResult {

    public status: Status;
    public data: any;
    public message: string;
    public code: number;
  
    constructor(init: Partial<JsonResult> = null) {
      Object.assign(this, init);
    }

    static is(item: any) : boolean {
      if (item) {
        return item.hasOwnProperty('status') && item.hasOwnProperty('data');
      }
      return null;
    }
  }

export enum Status {
  SUCCESS,
  FAIL,
  ERROR,
}
  
