import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee dash board.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

formValue !: FormGroup;
employeeModelObj:EmployeeModel=new EmployeeModel();
employeeData!:any;
showAdd!:boolean;
showUpdate!:boolean;
  constructor( private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.getAllEmployee();
    this.formValue=this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      salary:['']





    })
     
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=false;
    this.showUpdate=true;
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.firstName;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;
    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("employee added successfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
    },err=>{
      alert("something went wrong")
    }
    )
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData=res;
      console.log(this.employeeData)
    })
  }
  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }
  onEdit(row:any){
    this.employeeModelObj.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
   

  }
  updateEmployeeDetails(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("updated successfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
    })

  }

}
