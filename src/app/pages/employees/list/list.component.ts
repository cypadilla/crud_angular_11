import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  navigationExtras : NavigationExtras = {
    state:{
      value:null
    }
  }

  fakeData = [
    {
      name: 'Cristian',
      lastName: 'Padilla Perea',
      email:'cristancho2011@gmail.com',
      startDate:'02-20-2020'
    },
    {
      name: 'Cristiancho',
      lastName: 'Padilla Perea',
      email:'cristancho@gmail.com',
      startDate:'02-20-2020'
    },
    {
      name: 'Pedro',
      lastName: 'Perez',
      email:'pedro2011@gmail.com',
      startDate:'02-20-2020'
    },
    {
      name: 'Carlos',
      lastName: 'avs Perea',
      email:'carlos2011@gmail.com',
      startDate:'02-20-2020'
    },
    {
      name: 'lola',
      lastName: 'Padilla Perea',
      email:'lola2011@gmail.com',
      startDate:'02-20-2020'
    },
  ]
  constructor(private router: Router) { }

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
  onGoToDelete(item:any):void{
    alert('Deleted')
  }

}
