import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ViewService } from '../view.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complaintresponse',
  templateUrl: './complaintresponse.component.html',
  
})
export class ComplaintresponseComponent implements OnInit {
  showComplaintList: boolean = false;
  complainListByDepartment: any;
  showComplaintDetail: boolean = false;
  statusDropdown: any;
  ggg: any;
  Editor = BalloonEditor;
  departmentId: any;
  departmentName: any;
  complaintType: any;
  priority: any;
  title: any;
  detail: any;
  status: any;
  complaintId: any;
  editorConfig = {
  placeholder: 'Type comment here!',
};
 commentDetail: any;



  constructor(private fb: FormBuilder, private viewService: ViewService, private router: Router, private route: ActivatedRoute) { 
  


  }

  ngOnInit() {
    let gg = null;
    console.log('this.route.snapshot',this.route.snapshot);
    const url = window.location.href;
    this.route.queryParamMap.subscribe(queryParams => {
      this.departmentId = queryParams.get("departmentId");
     // this.commentDetail = "";
    })

    console.log("url", url);
    

    

    
    //this.departmentId = +this.route.snapshot.paramMap.get('departmentId');
 
   this.getComplaintByDepartment(this.departmentId);
  }



  Status = [
    { id: 1, name: 'Unattended' },
    { id: 2, name: 'Processing' },
    { id: 3, name: 'Awating Approval' },
    { id: 4, name: 'Approved' },
    { id: 5, name: 'Processed' },
    { id: 6, name: 'Done' },
    { id: 7, name: 'Not Applicable' },
    { id: 8, name: 'Irrelevant' },
  ];


  getComplaintByDepartment(id)
  {
    this.viewService.getComplaintsByDepartment(id).subscribe((response : any) => {
    
      this.complainListByDepartment = response.result;

      this.ggg = Array.of(this.complainListByDepartment);

      this.showComplaintList = true;

      console.log("complainListByDepartment", this.complainListByDepartment);



    })

  }

  viewDetail(row) {
    console.log(row);
    
    this.showComplaintDetail = true; this.showComplaintList =false;


     
    this.departmentName=row.departmentName;
    this.complaintType=row.complaintType;
    this.priority=row.priority;
    this.title=row.title;
    this.detail=row.complaintDetail;
    this.status = row.status;
    this.complaintId = row.complaintId;

  }

  onSaveStatus()
  {
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

    let data = {

     complaintId :  this.complaintId,
      statusId: this.statusDropdown,
      complaintresponse: this.commentDetail,
    }
    this.viewService.UpdateStatus(data).subscribe((response : any) => {
      Swal.fire(
          'Response!',
          response.result,
          'success'
        )

        this.showComplaintDetail = false;
        this.showComplaintList = true;


    })
  }
});

  }

}
