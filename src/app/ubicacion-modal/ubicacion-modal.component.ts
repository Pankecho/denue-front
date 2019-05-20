import {Component, Inject, OnInit} from '@angular/core';
import {Ubicacion} from '../shared/models/general';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ApiServiceService} from '../shared/services/api-service.service';
import Swal from 'sweetalert2';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ubicacion-modal',
  templateUrl: './ubicacion-modal.component.html',
  styleUrls: ['./ubicacion-modal.component.scss']
})
export class UbicacionModalComponent implements OnInit {

  actual: Ubicacion = null;

  formulario: FormGroup;

  editar = false;

  constructor(public dialogRef: MatDialogRef<UbicacionModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Ubicacion,
              private service: ApiServiceService) {
    if (data) {
      this.actual = data;
      this.editar = true;
    } else {
      this.actual = new Ubicacion();
    }
  }

  ngOnInit() {
    this.formulario = new FormGroup({
      tipo_vial : new FormControl(null, []),
      num_ext : new FormControl(null, []),
      letra_ext : new FormControl(null, []),
      nom_cen_com : new FormControl(null, []),
      num_local : new FormControl(null, []),
      nom_vial : new FormControl(null, [Validators.required]),
      codigo_postal : new FormControl(null, [Validators.required]),
      entidad : new FormControl(null, [Validators.required]),
      municipio : new FormControl(null, [Validators.required]),
      localidad : new FormControl(null, [Validators.required]),
      latitud : new FormControl(null, [Validators.required]),
      longitud : new FormControl(null, [Validators.required]),
    });
  }

  guardar() {
    if (this.editar) {
      this.service.updateUbicacion(this.actual).subscribe(result => {
        Swal.fire('Exito', 'Dato actualizado correctamente', 'success');
        this.dialogRef.close(true);
      }, error => {
        Swal.fire('Error', error.error.Data.sqlMessage, 'error');
      });
    } else {
    }
  }
}
