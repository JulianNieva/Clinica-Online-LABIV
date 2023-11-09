import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loading:boolean = false
  //@ts-ignore
  formUsuario: FormGroup;

  constructor(private fb: FormBuilder,private swal:SwalService) { }

  ngOnInit(): void {
    this.loading = true
    this.formUsuario = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      clave: ['',[Validators.required,Validators.minLength(6)]]
    });

    setTimeout(() => {
      this.loading = false
    }, 1600);
  }

  Login()
  {
    
  }
}
