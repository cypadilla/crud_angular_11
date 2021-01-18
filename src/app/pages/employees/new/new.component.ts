import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  template: `<app-employee-form></app-employee-form>`,
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
