import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../shared/services/api-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Usuario} from '../shared/models/general';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  usuario = new Usuario();

  constructor(private service: ApiServiceService,
              private router: Router) { }

  ngOnInit() {
    this.formulario = new FormGroup({
      usuario: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  login() {
    this.service.login(this.usuario).subscribe(result => {
      localStorage.setItem('user', this.usuario.rol);
      this.router.navigate(['/index']);
    }, error => {
      Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
    });
  }

}
