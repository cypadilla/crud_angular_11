import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Employee } from 'src/app/shared/components/models/employee.interface';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  employee: Employee = null;
  navigationExtras : NavigationExtras = {
    state:{
      value:null
    }
  }
  constructor(private router: Router, private employeesService:EmployeesService) { 
    const navigation = this.router.getCurrentNavigation();
    this.employee = navigation?.extras?.state?.value;
  }

  ngOnInit(): void {
    if(typeof this.employee === 'undefined'){
      this.router.navigate(['list'])
    }
  }

  onGoToEdit():void{
    this.navigationExtras.state.value = this.employee;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  async onGoToDelete(): Promise <void>{
    try {
      await this.employeesService.onDeleteEmployee(this.employee.id)
      alert('Deleted')
      this.onGoBackToList();
    } catch (error) {
      console.error(error)
    }
  }

  onGoBackToList():void{
    this.router.navigate(['list'])
  }
}
