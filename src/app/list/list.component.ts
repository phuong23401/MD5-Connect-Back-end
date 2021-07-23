import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { ICustomer } from '../icustomer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  customerList: Array<ICustomer> = [];

  constructor(private config: ConfigService) {
    this.customerList = config.customerList;
   }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.config.getAll().subscribe(data => {
      this.customerList = data;
    })
  }
}
