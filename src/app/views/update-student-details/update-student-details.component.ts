import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewService } from '../view.service';
import { Router, ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-student-details',
  templateUrl: './update-student-details.component.html',
  styleUrls: ['./update-student-details.component.scss']
})
export class UpdateStudentDetailsComponent implements OnInit {
 updateForm:any;
 updateData:any;
 registrationId: any;

 studentDetails: any;

 firstName: any;
 lastName: any;
 middleName?: any;
 Email:any;
 Mobile:any;
 isReadOnly:boolean = true;
 guardianName:any
 GEmail:any;
 Gmobile:any;
 fax:any;
//  @Input()
//  maxlength: string | number;

  constructor(private fb: FormBuilder, private viewService:ViewService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.InitialiseInput();
    console.log('this.route.snapshot',this.route.snapshot);
    const url = window.location.href;
    this.route.queryParamMap.subscribe(queryParams => {
      this.registrationId = queryParams.get("username");
     // this.commentDetail = "";
    })
    
    console.log("this.registrationId", this.registrationId);
    this.getDetails();

  }



  getDetails()
  {

    this.viewService.getStudentDetails(this.registrationId).subscribe((response: any)=> {
  
      this.studentDetails = response.result;
      console.log('studentDetails', this.studentDetails);
      
      this.firstName = this.studentDetails.FirstName;
      this.lastName = this.studentDetails.LastName;
      this.middleName = this.studentDetails.MiddleName;
      this.Mobile = this.studentDetails.MobileNo;
      this.Email = this.studentDetails.EmailId;
      this.fax = this.studentDetails.Fax;
      this.guardianName = this.studentDetails.Gname;
      this.GEmail = this.studentDetails.Email;
      this.Gmobile = this.studentDetails.Mobile;

    })
  }


 
 

  InitialiseInput(){
    this.updateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber:['',Validators.required],
      email:['',Validators.required],
      // license:['',Validators.required],
      // passport:['',Validators.required],
      Gname:['',Validators.required],
      Gemail:['',Validators.required],
      GmobileNumber:['',Validators.required],
      middleName:['', Validators.required],
    })
  }
  get f() {return this.updateForm.controls;}

  omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
}


  onSubmit(form)
  {
    //console.log('form',form);
    Swal.fire({
      title: 'Note',
      text: "You are about to update your details!!!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result)=>
    {
      if (result.value)
    {
    

     let data = 
    {


     LinkId: this.studentDetails.LinkId,
     RegistrationNo: this.studentDetails.RegistrationNo,
     CallDate: this.studentDetails.CallDate,
     Gender: this.studentDetails.Gender,
     Title: this.studentDetails.Title,
     Nationality: this.studentDetails.Nationality,
     AttendedBy: this.studentDetails.AttendedBy,
     ForwardedTo: this.studentDetails.ForwardedTo,
     FormStatus: this.studentDetails.FormStatus,
     StudentStatus: this.studentDetails.StudentStatus,
     Remarks: this.studentDetails.Remarks,
     ProspectStatus: this.studentDetails.ProspectStatus,
     RefferedBy: this.studentDetails.RefferedBy,
     CourseType: this.studentDetails.CourseType,
     DegreeType: this.studentDetails.DegreeType,
     MediaSource: this.studentDetails.MediaSource,
     CallerCategoryId: this.studentDetails.CallerCategoryId,
     Religion: this.studentDetails.Religion,
     Telephone: this.studentDetails.Telephone,
     Fax: this.studentDetails.Fax,
     PoBox: this.studentDetails.PoBox,
     Industry: this.studentDetails.Industry,
     DOB: this.studentDetails.Dob,
     BloodGroup: this.studentDetails.BloodGroup,
     ProficiencyInEnglish: this.studentDetails.ProficiencyInEnglish,
     IsInternationalStudent: this.studentDetails.IsInternationalStudent,
     Status: this.studentDetails.Status,
     CreatedBy: this.studentDetails.CreatedBy,
     entrydate: this.studentDetails.Entrydate,
     StudStatus: this.studentDetails.StudStatus,
     StudAdmissionStatus: this.studentDetails.StudAdmissionStatus,
     StatusUpdatedate: this.studentDetails.StatusUpdatedate,
     CityName: this.studentDetails.CityName,
     OnlineImportID: this.studentDetails.OnlineImportID,
    firstName:form.value.firstName,
     lastName:form.value.lastName,
     middleName:form.value.middleName,
     MobileNo:form.value.mobileNumber,
     EmailId:form.value.email,
     license:form.value.license,
     passport:form.value.passport,
     Gname:form.value.Gname,
     Email:form.value.Gemail,
     Mobile:form.value.GmobileNumber,
     SchoolCode: this.studentDetails.SchoolCode,
   
     RelationShip: this.studentDetails.RelationShip,
     Profession: this.studentDetails.Profession,
     Organization: this.studentDetails.Organization,
     ResPhone: this.studentDetails.ResPhone,
     OffPhone: this.studentDetails.OffPhone,
     Address: this.studentDetails.Address,
     Website:this.studentDetails.Website,
     PName: this.studentDetails.Pname,
     PRelationShip: this.studentDetails.PrelationShip,
     POrganization: this.studentDetails.Porganization,
     PEmail: this.studentDetails.Pemail,
     PMobile: this.studentDetails.Pmobile,
     PResPhone: this.studentDetails.PresPhone,
     POffPhone: this.studentDetails.PoffPhone,
     PAddress: this.studentDetails.Paddress,
     PWebsite: this.studentDetails.Pwebsite,
     Countryofresidence: this.studentDetails.Countryofresidence,
     StudentStatusSubMenu: this.studentDetails.StudentStatusSubMenu,
     Pprofession: this.studentDetails.Pprofession,
     


   
     
    }

    console.log('data',data);
    
    this.viewService.UpdateDetails(data).subscribe((response : any) => {
     // this.updateData = response.result;
      if(response.success==true){
        Swal.fire(
          'Saved!',
          'Your record has been updated.',
          'success',
        )  


      }
      else{
        Swal.fire(
          'Saved!',
          'Your record has not been saved.',
          'warning'
        )  

      }

     // this.router.navigate(['http://lms.sun.edu.ng/my']);
      window.location.href = "http://lms.sun.edu.ng";
     
      })

   
      
      
    }
  

      
    });

    
  }

}
