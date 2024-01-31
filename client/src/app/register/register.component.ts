import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { passwordMatchValidator } from './passwordMatchValidator';
import {TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit  {


  constructor(private fb: FormBuilder, private authService : AuthService, private router: Router,private translateService:TranslateService) {}


  registerForm!: FormGroup;
  newIsSaved!:boolean;

  register : any = {
    userName: '',
    password: '',
    confirmPassword:''}

  createForm(){
    this.registerForm = this.fb.group({
      userName:['', [Validators.required]],
      password:['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    } ,{validators:  passwordMatchValidator}); }

    onSubmit(): void {
      if (this.registerForm.valid) {
        const { userName, password } = this.registerForm.value;
    
        this.authService.registerUser({ username: userName, password }).subscribe({
          next: (response) => {
            console.log("Registration successful:", response);
            this.newIsSaved = true;
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Registration failed:', error.error); // Log the error message
          }
        });
      }
    }
lang:string='';

ngOnInit() : void {
  this.createForm();
  this.newIsSaved = false;
  this.lang = localStorage.getItem('lang') || 'en';
}

goToLogin() : void{
  this.router.navigate(['/login']);
}

canExit(){
  if(!this.newIsSaved){
    return window.confirm('You have unsaved changes. Do you really want to discard this change?');
    
  }else{
    return true;
  }
}

ChangeLanguage(lang : any){
  const selectedLanguage = lang.target.value;
  localStorage.setItem('lang',selectedLanguage);
  this.translateService.use(selectedLanguage);
}
}
