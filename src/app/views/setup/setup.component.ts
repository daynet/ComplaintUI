import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewService } from '../view.service';
import { Router } from '@angular/router';
import { Response } from 'selenium-webdriver/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',

  
})
export class SetupComponent implements OnInit {

 setupForm: any;
 setupComplainInput: boolean =  false;
 departmentList: any;
 complaints: any;
 complainTypeList: any;
 displayComplainType: boolean = true;
 displayType: boolean = false;
 typeId: number;
 dayo: any;
 isSave:boolean = false;
 

  constructor(private fb: FormBuilder, private viewService: ViewService, private router: Router) { }

  ngOnInit() {
    this.getComplaintType();
   this.ValidationProcess();
 
  
   this.getDepartment();


  }



  ValidationProcess()
  {
    this.setupForm = this.fb.group({
      departmentId: ['', Validators.required],
      complaintName: ['', Validators.required],


    })
  }

  get f() {return this.setupForm.controls;}

  getDepartment() {
    this.viewService.getDepartment().subscribe((response : any) => {
      this.departmentList = response.result;

      console.log('this.departmentList',this.departmentList);
      
    })
  }


  getComplaintType()
  {
    this.viewService.getComplainType().subscribe((response: any)=> {
      
      this.complainTypeList = response.result;
     // this.displayComplainType = true;
     console.log("complaintypelist", this.complainTypeList);
 

    })
  }

  deleteComplaint(complaintId)
  {
    this.viewService.deleteComplaint(complaintId).subscribe((response: any) => {

      const index = this.complainTypeList.indexOf(complaintId);
      this.complainTypeList.splice(index, 1);



    })
  }


   updateComplaint(complaintId)
   {
    this.viewService.loadComplaint(complaintId).subscribe((response: any) => {
     
      this.dayo = response.result;

      console.log("List", this.dayo);
      this.typeId = this.dayo.complaintTypeId;
      console.log("complaintName",this.dayo.complaintName );
      console.log("complainTypeid",  this.typeId );
    
      this.setupForm.controls['departmentId'].setValue(this.getComplaintType())
      this.setupForm.controls['complaintName'].setValue(this.dayo.complaintName);
      this.displayType = true;
      this.displayComplainType = false;

    })

    /*  this.viewService.deleteComplaint(data).subscribe((response: any) => {
      
      this.displayType = true;




     }) */

   }



  onSave(form) {

    if(this.typeId == null)
    {
     
    //console.log('form',form);
    Swal.fire({
      title: 'Note',
      text: "You are about to save your details!!!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {


        let data =
        {
          departmentId: form.value.departmentId,
          complaintName: form.value.complaintName,
          
        }

        console.log('data', data);

        this.viewService.addComplaintType(data).subscribe((response: any) => {
          this.complaints = response.result;
          if (response.success == true) {

            if (true) {
              this.getComplaintType();
              this.displayType = false;
              this.displayComplainType = true;
            }
          } else {
            Swal.fire(
              response.message, "error"
            )
          }
        })
        // Swal.fire(
        //   'Saved!',
        //   'Your record has been saved.',
        //   'success'
        // )
      }
    });
  }

  else
  {
    let data =
    {
      departmentId: form.value.departmentId,
      complaintName: form.value.complaintName,
      ComplaintTypeId: this.typeId,
      
      
    }

    console.log('data', data);
     this.viewService.updateComplaint(data).subscribe((response : any) => {
        this.isSave = response.result;

        if(this.isSave == true)
        {
           Swal.fire(
           'Saved!',
           'Your record has been saved.',
           'success'
         )
         this.displayType = false;
         this.getComplaintType();
         this.displayComplainType = true;
        }
         

     })
  }
  }





}
