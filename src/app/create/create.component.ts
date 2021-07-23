import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { ICustomer } from '../icustomer';

import {FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  customerForm: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    address: new FormControl()
  });

  customerList: Array<ICustomer> = [];

  constructor(private config: ConfigService, private router: Router) {}

  ngOnInit(): void {
  }

  create() {
    const customer = this.customerForm.value;
    console.log(customer);
    this.config.create(customer).subscribe(() => {
      this.customerForm.reset();
      alert('Add new customer successfully!');
    });
    this.router.navigate(['/list']);
  }
}
