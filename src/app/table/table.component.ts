import { Component, Input, ViewChild } from '@angular/core';
declare let require: any;
const data: any = require('./company.json');

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  editing = {};
  @Input() rows = [];
  temp = [...data];
  selected = [];

  loadingIndicator = true;
  reorderable = true;
  checkboxable: true;

  @Input() columns = [{
    prop: 'selected', 
    name: '',
    // sortable: false,
    // canAutoResize: false,
    // draggable: false,
    // resizable: false,
    headerCheckboxable: true,
    checkboxable: true,
    width: 70
  }, { name: 'Unit' }, { name: 'Priority' }, { name: 'Type' }, { name: 'Description' }, { name: 'Status' }, { name: 'SLA Status' }, { name: 'Aging' }, { name: 'Action' }];

  @ViewChild(TableComponent, { static: false }) table: TableComponent;
  constructor() {
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.unit.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }
  // updateValue(event, cell, rowIndex) {
  //   console.log('inline editing rowIndex', rowIndex);
  //   this.editing[rowIndex + '-' + cell] = false;
  //   this.rows[rowIndex][cell] = event.target.value;
  //   this.rows = [...this.rows];
  //   console.log('UPDATED!', this.rows[rowIndex][cell]);
  // }

}
