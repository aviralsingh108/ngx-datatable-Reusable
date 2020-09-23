import { Component, Input, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';//
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

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;//
  constructor() {
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    //const value = val.toString().toLowerCase().trim();
    // get the amount of columns in the table
    const count = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.temp[0]);
    // assign filtered matches to the active datatable
    this.rows = this.temp.filter(item => {
      // iterate through each row's column data
      for (let i = 0; i < count; i++) {
        // check for a match
        if (
          (item[keys[i]] &&
            item[keys[i]]
              .toString()
              .toLowerCase()
              .indexOf(val) !== -1) ||
          !val
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });

    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
}


//ORIGINAL CODE
  //   updateFilter(event) {
  //     const val = event.target.value.toLowerCase();
  //     const temp = this.temp.filter(function (d) {
  //       return (d.unit.toLowerCase().indexOf(val) !== -1 || !val);
  //    });

  //     // update the rows
  //     this.rows = temp;
  //     // Whenever the filter changes, always go back to the first page
  //     this.table = data;
  //   }

    // filter our data
    // this.temp = this.temp.filter(function (d)){
    //   for (let i = 0; i < colamt; i++) {
    //     if (d[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val) {
    //       return true;
    //     }
    //   }
    // }
    // let colamt = this.columns.length;
    // let keys = Object.keys(this.temp[0]);
    // console.log(keys);  
    // const temp = this.temp.filter(function (d) {

    //   for (let i = 0; i < colamt; i++) {
    //     if (d[keys[i]].toLowerCase().indexOf(val) !== -1 || !val) {

    //       return  (d.unit.toLowerCase().indexOf(val) !== -1 || !val);
    //     }
    //   }
    // });


  // updateValue(event, cell, rowIndex) {
  //   console.log('inline editing rowIndex', rowIndex);
  //   this.editing[rowIndex + '-' + cell] = false;
  //   this.rows[rowIndex][cell] = event.target.value;
  //   this.rows = [...this.rows];
  //   console.log('UPDATED!', this.rows[rowIndex][cell]);
  // }


