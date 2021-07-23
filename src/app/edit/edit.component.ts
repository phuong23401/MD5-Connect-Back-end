import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
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

  ngOnInit(): void {}

  getCustomer(id: number) {
    return this.config.findById(id).subscribe(customer => {
      this.customerForm.setValue({
        firstName: new FormControl(customer.firstName),
        lastName: new FormControl(customer.lastName),
        address: new FormControl(customer.address)
      });
    });
  }

  edit(id: number) {
    const customer = this.customerForm.value;
    this.config.edit(id, customer).subscribe(() => {
      alert('Update customer successfully!');
    });
    this.router.navigate(['/list']);
  }
}
32