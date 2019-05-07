import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formregister: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private toast: ToastController
  ) { }

  ngOnInit() {
    this.formregister = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  register(user){
    console.log(user);
    this.authService.registerUser(user)
     .then( res => {
       this.router.navigateByUrl('/');
       this.showToast('Usuário add');
     }, err => console.log(err));
  }

  showToast(msg){
    this.toast.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present() );
  }

  goLoginPage(msg){
    this.router.navigateByUrl('/');
  }
  
}
