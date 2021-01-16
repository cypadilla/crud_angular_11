import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  value = null;
  employeeForm: FormGroup;
  private isEmail = '/\S+@\S+\.\S+/';
  constructor(private router: Router, private formBuilder: FormBuilder) {
    const navigation = router.getCurrentNavigation();
    this.value = navigation?.extras?.state;
   }

  ngOnInit(): void {
    this.initForm();
  }

  onSave():void{
    console.log(this.employeeForm.value)
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
