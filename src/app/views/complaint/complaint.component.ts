import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Validators, FormBuilder } from '@angular/forms';
import { ViewService } from '../view.service';
import { Router } from '@angular/router';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  //styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {

  logedBy: any;
  ComplaintForm: any;
  complaints: any;
  logedByList: any;
  showComplaintInput:boolean;
  showComplaintList:boolean = true;
  showComplaintDetail:boolean;
  Editor = BalloonEditor;
  department:any;
  complaintType:any;
  priority:any;
  title:any;
  detail:any;
  responseComment: any;
  ratingDropdown:any;

  editorConfig = {
    placeholder: 'Type complaint here!',
};


conplaintDetail:any;
complaintTypeList: any;
  departmentList: any;
  status: any;
  complaintId: any;
  loggedBy:any;
 // article: IArticle;

  constructor(private fb: FormBuilder, private viewService: ViewService, private router: Router) {


  }

  ngOnInit() {
    this.loggedBy = localStorage.getItem('username');
    this.InitialiseInput();
    this.getDepartment();
    
    this.getComplaintsLogedBy(this.loggedBy);
  }

  statuses = [
    { id: 1, name: 'Active' },
    { id: 2, name: 'Inactive' },
];

Rating = [
  { id: 1, name: 'Excellent' },
  { id: 2, name: 'VeryGood' },
  { id: 3, name: 'Good' },
  { id: 4, name: 'Fair' },
  { id: 5, name: 'Bad' },
];


Priority = [
  { id: 1, name: 'Low' },
  { id: 2, name: 'High' },
  { id: 3, name: 'Critical' },
];


  InitialiseInput() {
    this.ComplaintForm = this.fb.group({
      departmentId: [0, Validators.required],
      complaintTypeId: [0, Validators.required],
      priorityId: [0],
      complaint: ['', Validators.required],
      title: ['', Validators.required]
    })

       // this.conplaintDetail = " ";
  }

  get f() { return this.ComplaintForm.controls; }


  onSubmitConplaint(form) {
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
          complaintTypeId: form.value.complaintTypeId,
          priorityId: form.value.priorityId,
          complaintDetail: this.conplaintDetail,
          title: form.value.title,
          LogedBy: localStorage.getItem('username')
        }

        console.log('data', data);

        this.viewService.AddComplaint(data).subscribe((response: any) => {
          if (response.success == true) {

            if (true) {
              this.getComplaintsLogedBy(this.loggedBy);
              this.showComplaintList=true; this.showComplaintInput=false;
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

  getComplaint(logedBy) {
    this.viewService.getComplaint(logedBy).subscribe((response) => {
      this.logedByList = response;
    })
  }


  getDepartment() {
    this.viewService.getDepartment().subscribe((response : any) => {
      this.departmentList = response.result;

      console.log('this.departmentList',this.departmentList);
      
    })
  }

  getComplaintType(departmentId) {
    this.viewService.getComplaint(departmentId).subscribe((response:any) => {
      this.complaintTypeList = response.result;

      console.log('complaintTypeList', this.complaintTypeList);
      
    })
  }
 
  // click view to get details of complain
  getComplaintsLogedBy(logedBy) {
    this.viewService.getComplaintsLogedBy(logedBy).subscribe((response:any) => {
      this.complaints = response.result;

      console.log('complaints', this.complaints);
      
    })
  }

  viewDetail(row) {
    console.log(row);
    
    this.showComplaintDetail = true; this.showComplaintList =false;

    this.department=row.departmentName;
    this.complaintType=row.complaintType;
    this.priority=row.priority;
    this.title=row.title;
    this.detail=row.complaintDetail;
    this.status = row.status;
    this.complaintId = row.complaintId;
    this.responseComment = row.ComplaintResponse;


  }

  onSaveRating(){
    let data = {
      complaintId : this.complaintId,
      ratingId : this.ratingDropdown
    }
    this.viewService.UpdateRating(data).subscribe((response:any) => {
     
      Swal.fire(
          'Response!',
          response.result,
          'success'
        )
        this.getComplaintsLogedBy(this.loggedBy);
        this.showComplaintDetail = false;
        this.showComplaintList = true;

    })
  }



}
