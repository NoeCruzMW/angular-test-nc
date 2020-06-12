import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/Employee';
import { Subscription } from 'rxjs';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { UtilsService } from 'src/app/services/utils.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.sass']
})
export class EmployeesComponent implements OnInit,OnDestroy {

  private employeeSubs: Subscription;
  private employees: Employee[];
  emmployeeForm: FormGroup;
  submittedForm= false;
  rows = [];
  temp = [];
  columns = [{ prop: 'name' }, { prop: 'last_name' }, { name: 'birthday' }];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  ColumnMode = ColumnMode;


  constructor(private employeeService:EmployeeService,private util:UtilsService,private formBuilder:FormBuilder) {    
  }
   

  ngOnInit(): void {
  
    this.emmployeeForm = this.formBuilder.group({
      name:['',[Validators.required]],
      last_name:['',[Validators.required]],
      birthday:['',[Validators.required]],
    });
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeSubs =  this.employeeService.getAll().subscribe(em=>{
      this.employees = em.map(e=>{e.birthday=this.util.transformDate(e.birthday); return e;});
      this.temp = [...em];
      this.rows = em;      
    });
  }



  public get eForm() {
    return this.emmployeeForm.controls;
  }

  saveEmployee(){
      this.submittedForm = true;
      if(this.emmployeeForm.invalid){
        return;
      }
      this.employeeService.add({
         name:this.emmployeeForm.get('name').value,
        last_name: this.emmployeeForm.get('last_name').value,
        birthday:this.emmployeeForm.get('birthday').value,
      }).subscribe(e=>{
        console.log(e)
        if(e.success){
          Swal.fire('', 'Saved!', 'success')
          this.loadEmployees();
        }
      });
  }

  ngOnDestroy(): void {
    this.employeeSubs.unsubscribe(); 
  }

  
  /**
   *  Basic filtering ngx
   * @param event 
   */
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }
}
