import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  loginFG: any;
  loginResponse: any;

  constructor(private fb: FormBuilder, private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.InitLoginForm();
  }

  get f() {return this.loginFG.controls;}

  InitLoginForm() {
    this.loginFG = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }


  Login(form){
    let data = {
      userName:form.value.userName,
      password:form.value.password
    }

    console.log('data',data);
    

    this.loginService.login(data).subscribe((response : any) => {
      this.loginResponse = response;

      console.log('this.loginResponse',this.loginResponse);

      if(this.loginResponse.success==true){
        localStorage.setItem('response', 'true')
       // localStorage.setItem('rauteGaurd', 'true');
       localStorage.setItem('departments', this.loginResponse.auth.department);
        localStorage.setItem('token', this.loginResponse.auth.BearerToken);
        localStorage.setItem('username',this.loginResponse.auth.UserName);
        
        this.router.navigate(['/dashboard']);
      
      }else{
        Swal.fire(
          'Error!',
          response.message,
          'error'
        )
      }
      
    })
  }
 }