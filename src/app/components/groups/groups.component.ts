import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Group } from 'src/app/models/Group';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass']
})
export class GroupsComponent implements OnInit {

  groupSub: Subscription;
  groups: Group[] = [];
  searchCriteria: string="";
  addedGroups:number[]=[]
  groupNameAdded: string;
  employees: Employee[] = [];
  selectedAll = true;
  constructor(private groupService:GroupService,private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.groupSub = this.groupService.getAllGroups()
      .subscribe(groups=>{
        this.groups = groups;
      })
  }

  onDrop(event){
    let group = event.dragData as Group;
    if (!this.addedGroups.includes(group.id)) {
      this.groupNameAdded=group.name;
      this.loadEmployees(group.id);
      this.addedGroups.push(group.id);
    }
  }


  loadEmployees(id:number){
    this.employeeService.getEmployeesByGroupId(id)
      .subscribe(employees=>{
        this.employees=this.employees.concat(employees); 
        this.selectAll();      
    },error=>{
      
    });

  }

  removeGroups(){
    this.employees=[];
    this.addedGroups=[];
  }

  selectAll(){    
    
    this.employees.map(employee=>{employee.selected=this.selectedAll; return employee});
    this.selectedAll = !this.selectedAll;
  }

  showSelected(){
    console.log(this.employees.filter(e=>e.selected).map(em=>em.name));
  }
}
