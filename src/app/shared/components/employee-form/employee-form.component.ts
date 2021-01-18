import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.interface';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  
  employee :Employee;
  employeeForm: FormGroup;

  private isEmail = '/\S+@\S+\.\S+/';

  constructor(private router: Router, private formBuilder: FormBuilder) {
    const navigation = router.getCurrentNavigation();
    this.employee = navigation?.extras?.state?.value;
    this.initForm();
   }

  ngOnInit(): void {
    if(typeof this.employee === 'undefined'){
      this.router.navigate(['new'])
    }else{
      this.employeeForm.patchValue(this.employee)
    }
  }

  onSave():void{
    console.log(this.employeeForm.value)
  }

  onGoBackToList():void{
    this.router.navigate(['list'])
  }

  private initForm():void{
    this.employeeForm = this.formBuilder.group({
      name:['',[Validators.required]],
      lastName:['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern(this.isEmail)]],
      startDate:['',[Validators.required]],
    })
  }
}
