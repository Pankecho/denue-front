import { Component, OnInit, Inject } from '@angular/core';
import {Empresa} from '../shared/models/general';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ApiServiceService} from '../shared/services/api-service.service';
import Swal from 'sweetalert2';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-empresa-modal',
  templateUrl: './empresa-modal.component.html',
  styleUrls: ['./empresa-modal.component.scss']
})
export class EmpresaModalComponent implements OnInit {

  actual: Empresa = null;

  editar = false;

  formulario: FormGroup;

  constructor(public dialogRef: MatDialogRef<EmpresaModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Empresa,
              private service: ApiServiceService) {
    if (data) {
      this.actual = data;
      this.editar = true;
    } else {
      this.actual = new Empresa();
    }
  }

  ngOnInit() {
    this.formulario = new FormGroup({
      nombre : new FormControl(null, [Validators.required]),
      razon_social : new FormControl(null, [Validators.required])
    });
  }

  guardar() {
    if (this.editar) {
      this.service.updateEmpresa(this.actual).subscribe(result => {
        console.log(result);
        Swal.fire('Exito', 'Dato actualizado correctamente', 'success');
        this.dialogRef.close(true);
      }, error => {
        Swal.fire('Error', error.error.Data.sqlMessage, 'error');
      });
    } else {
      this.service.createEmpresa(this.actual).subscribe(result => {
        console.log(result);
        Swal.fire('Exito', 'Dato creado correctamente', 'success');
        this.dialogRef.close(true);
      }, error => {
        Swal.fire('Error', error.error.Data.sqlMessage, 'error');
      });
    }
  }

}
