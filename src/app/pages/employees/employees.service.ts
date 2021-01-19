import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/shared/components/models/employee.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  employees:Observable <Employee[]>;

  private employeesCollection:AngularFirestoreCollection<Employee>;
  
  constructor(private readonly angularFirestore:AngularFirestore) {
    this.employeesCollection = angularFirestore.collection<Employee>('employees');
    this.getEmployees();
   }

   onDeleteEmployee( employeeId:string ): Promise<void>{
     return new Promise( async (resolve, reject) => {
       try {
         const result = await this.employeesCollection.doc(employeeId).delete();
         resolve(result)
       } catch (error) {
         reject(error.message)
       }
     })
   }
   
   onSaveEmployee( employee:Employee,employeeId:string ): Promise<void>{ 
      return new Promise(async (resolve, reject) => {
        try {
          const id = employeeId || this.angularFirestore.createId();
          const data = { id, ...employee }
          const result = await this.employeesCollection.doc(id).set(data);
          resolve(result);
        } catch (error) {
          reject(error.message);
        };
      });

   }

   private getEmployees(): void{
     this.employees = this.employeesCollection.snapshotChanges().pipe(
       map(actions => actions.map(a => a.payload.doc.data() as Employee))
     )
   }


}
