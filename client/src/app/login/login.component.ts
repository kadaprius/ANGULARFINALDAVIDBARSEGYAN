import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,private translateService:TranslateService) {}
  loginForm: FormGroup;

  lang:string='';

  ngOnInit() : void {
    this.createForm();
    this.lang = localStorage.getItem('lang') || 'en';

  }

  goToRegister(){
    this.router.navigate(['/register'])
  }

  createForm() : void{
    this.loginForm = this.fb.group({
      userName:['', [Validators.required]],
      password:['', [Validators.required, Validators.minLength(6)]]
    });
 }
 onSubmit(){
  try {
     if (this.loginForm.valid) {
       const userData = this.loginForm.value;
       
       this.authService.loginUser(userData).subscribe(
         (response: any) => {
           console.log('logged in successfully: ', response);
           const jwtToken = response;
           localStorage.setItem('token', jwtToken);

           if (jwtToken){
           this.router.navigate(['/books']);
          }
          else{
            console.log('Login failed. Please check your credentials', 'Error');
          }
         },
         (error) => {
           console.log('login failed: ', error);
         }
       );
     }
  } catch (error) {
     console.log('login failed: ', error);
  }
 }
 ChangeLanguage(lang : any){
  const selectedLanguage = lang.target.value;
  localStorage.setItem('lang',selectedLanguage);
  this.translateService.use(selectedLanguage);
}

}
