import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../Config/app.config';
import { AppCongifService } from '../Config/app-congif.service';

//let AppConstant: any = "http://172.16.12.15/AptitudeTest/api/v1/";
let AppConstant: any = "http://localhost:56655/api/v1/";
//let AppConstant: any = "http://172.16.12.1/Complaint/api/v1/";
//let AppConstant: any = "https://localhost:44376/api/v1/";
//let AppConstants: any = "https://localhost:44347/api/v1/";
// let AppConstants: any = "http://localhost:56045/api/v1/"
let AppConstants: any = "http://172.16.12.1/StudentUpdate/api/v1/";



//let AppConstant: any = {};

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor(private http: HttpClient,private appConfig: AppCongifService) {

    //AppConstant = appConfig;
   }


  submitRegistration(data) {
    return this.http.post(`${AppConstant}register/user`,data);

  }
  
  
  getComplaint(departmentId)
  {
    return this.http.get(`${AppConstant}complainttype/all/${departmentId}/departmentId`);
  }

  getComplaintsLogedBy(logedBy)
  {
    return this.http.get(`${AppConstant}complaint/${logedBy}/logedBy`);
  }

  // gets the complain by department
  getComplaintsByDepartment(departmentId)
  {
    return this.http.get(`${AppConstant}complaint/${departmentId}/departmentId`);
  }

  deleteComplaint(ComplaintTypeId)
  {
    return this.http.delete(`${AppConstant}complainttype/${ComplaintTypeId}/ComplaintTypeId`);
    

  }
  updateComplaint(data)
  {
    return this.http.put(`${AppConstant}complainttype`, data);
    

  }

  getDepartment()
  {
    return this.http.get(`${AppConstant}department`);
  }

  getComplaintType(departmentId)
  {
    return this.http.get(`${AppConstant}complainttype/${departmentId}/departmentId`);
  }

  loadComplaint(ComplaintTypeId)
  {
    return this.http.get(`${AppConstant}complainttype/${ComplaintTypeId}/ComplaintTypeId`);
  }

  getComplainType()
  {
    return this.http.get(`${AppConstant}complainttype`);
  }


  getState()
  {
    return this.http.get(`${AppConstant}signup/state`);
  }
  getNationality()
  {
    return this.http.get(`${AppConstant}signup/nationality`);
  }
  getSaturdays()
  {
    return this.http.get(`${AppConstant}signup/saturday`);
  }
  

  getscoresheet(psid)
  {
    return this.http.get(`${AppConstant}Report/${psid}`);
  }

  AddComplaint(data) {
    return this.http.post(`${AppConstant}complaint`,data);
  }

  addComplaintType(data)
  {  
    return this.http.post(`${AppConstant}complainttype`,data);
  }


  UpdateRating(data) {
    return this.http.put(`${AppConstant}complaint/rating`,data);
  }

  UpdateStatus(data) {
    return this.http.put(`${AppConstant}complaint/status`,data);
  }

  // UpdateDetails(data) {
  //   return this.http.put(`${AppConstant}student/UpdateDetails`,data);
  // }

  UpdateDetails(data) {
    return this.http.post(`${AppConstants}student/UpdateDetails`,data);
  }

  getStudentDetails(regId)
  {
    return this.http.get(`${AppConstants}student/${regId}/regId`);
  }
 

  
}
