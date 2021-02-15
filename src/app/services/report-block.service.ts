import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportBlockService {

  private userId : any;

  constructor() { }

  setId(id:any) : void{
    this.userId = id;
  }

  getId() : any {
    return this.userId;
  }
}
