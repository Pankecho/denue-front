import { Component, OnInit } from '@angular/core';
import {Empresa} from '../shared/models/general';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material';
import {EmpresaModalComponent} from '../empresa-modal/empresa-modal.component';
import {ApiServiceService} from '../shared/services/api-service.service';
import {UbicacionModalComponent} from '../ubicacion-modal/ubicacion-modal.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  actual: Empresa = new Empresa();

  id: string;

  public columnas = ['tipo_vial', 'nom_vial', 'numero_ext', 'letra_ext', 'nom_CenCom', 'num_local', 'cod_postal', 'entidad', 'municipio', 'localidad', 'latitud', 'longitud', 'acciones'];

  canUpdate = false;

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private service: ApiServiceService,
              private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.actual.ubicaciones = [];
  }

  ngOnInit() {
    const current = localStorage.getItem('user');
    if (current) {
      if (current === 'adm' || current === 'edit' ) {
        this.canUpdate = true;
      }
      this.reloadData();
    } else {
      this.router.navigate(['/login']);
    }
  }

  reloadData() {
    this.service.getEmpresa(this.id).subscribe(result => {
      this.actual = result;
    }, error => {
      Swal.fire('Error', error.error.Data.sqlMessage, 'error');
    });
  }

  editar() {
    const copia = Object.assign(Object.create(Object.getPrototypeOf(this.actual)), this.actual);
    const dialogRef = this.dialog.open(EmpresaModalComponent, {
      width: '500px',
      data: copia
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reloadData();
      }
    });
  }

  descargarCSV() {
    window.location.href = `${this.service.URL_HOST}/${this.service.URL_EMPRESA}/${this.id}/csv`;
  }

  editarUbicacion(row) {
    const copia = Object.assign(Object.create(Object.getPrototypeOf(row)), row);
    const dialogRef = this.dialog.open(UbicacionModalComponent, {
      width: '500px',
      data: copia
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reloadData();
      }
    });
  }

  logout() {
    localStorage.setItem('user', null);
    this.router.navigate(['/login']);
  }
}
