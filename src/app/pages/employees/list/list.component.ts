import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  async onGoToDelete(employeeName: string, employeeLastName:string ,employeeId: string):Promise<void>{
    try {
      Swal.fire({
        title: `Seguro que desea eliminar a: ${employeeName} ${employeeLastName}`,
        text: "No podras revertir tus acciones",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si,eliminalo!',
        cancelButtonText:'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.employeesService.onDeleteEmployee(employeeId)
          .then(()=>{
            Swal.fire(
              `${employeeName} ${employeeLastName}`,
              'Ha sido eliminado',
              'success'
            )
          })
        }
      })
    } catch (error) {
      console.error(error)
    }
    
  }

}
