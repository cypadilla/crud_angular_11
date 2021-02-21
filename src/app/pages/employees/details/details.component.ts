import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Employee } from 'src/app/shared/components/models/employee.interface';
import Swal from 'sweetalert2';
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
      Swal.fire({
        title: `Seguro que desea eliminar a: ${this.employee.name} ${this.employee.lastName}`,
        text: "No podras revertir tus acciones",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si,eliminalo!',
        cancelButtonText:'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.employeesService.onDeleteEmployee(this.employee.id)
          .then(()=>{
            Swal.fire(
              `${this.employee.name} ${this.employee.lastName}`,
              'Ha sido eliminado',
              'success'
            )
          })
        }
      })
      this.onGoBackToList();
    } catch (error) {
      console.error(error)
    }
  }

  onGoBackToList():void{
    this.router.navigate(['list'])
  }
}
