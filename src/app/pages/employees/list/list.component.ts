import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  employees$ =  this.employeesService.employees;

  navigationExtras : NavigationExtras = {
    state:{
      value:null
    }
  }

  
  constructor(private router: Router, private employeesService:EmployeesService) { }

  ngOnInit(): void {
  }


  onGoToEdit(item:any):void{
    this.navigationExtras.state.value = item;
    this.router.navigate(['edit'], this.navigationExtras);
  }
  onGoToSee(item:any):void{
    this.navigationExtras.state.value = item;
    this.router.navigate(['details'], this.navigationExtras)
  }
  async onGoToDelete(employeeId: string):Promise<void>{
    try {
      await this.employeesService.onDeleteEmployee(employeeId)
      alert('Deleted')
    } catch (error) {
      console.error(error)
    }
    
  }

}
