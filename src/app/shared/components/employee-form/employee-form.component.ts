import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/pages/employees/employees.service';
import { Employee } from '../models/employee.interface';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  
  employee :Employee;
  employeeForm: FormGroup;

  private isEmail = /\S+@\S+\.\S+/;
  constructor(private router: Router, private formBuilder: FormBuilder,private employeeService : EmployeesService) {
    
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

    console.log(this.employeeForm.value);

    if( this.employeeForm.valid){
      const employee = this.employeeForm.value;
      const employeeId = this.employee?.id || null;
      this.employeeService.onSaveEmployee(employee,employeeId);
      this.employeeForm.reset();
    }else
    {
      alert('Error guardando usuario')
      console.error('error guardando los datos')
    }
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
    });
  }
}
