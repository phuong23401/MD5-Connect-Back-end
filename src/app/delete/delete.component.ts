import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ICustomer } from '../icustomer';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  customerForm: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    address: new FormControl()
  });
  id: any;

  constructor(private config: ConfigService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.getCustomer(this.id);
    });
  }

  ngOnInit(): void {
  }

  getCustomer(id: number) {
    return this.config.findById(id).subscribe(customer => {
      this.customerForm.setValue({
        firstName: new FormControl(customer.firstName),
        lastName: new FormControl(customer.lastName),
        address: new FormControl(customer.address)
      });
    });
  }

  delete(id: number) {
    this.config.delete(id).subscribe(() => {
      this.router.navigate(['/list']);
    })
  }
}
