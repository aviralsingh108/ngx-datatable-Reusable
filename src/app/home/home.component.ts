import { Component, OnInit } from '@angular/core';
declare let require: any;
const data: any = require('./reusable.json');


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rows = [];
  columns = [{ name: 'Priority' }, { name: 'Type' }, { name: 'Description' }, { name: 'Status' }, { name: 'SLA Status' }, { name: 'Aging' }, { name: 'Action' }];

  constructor() {
    this.rows = data;
  }

  ngOnInit(): void {
  }

}
