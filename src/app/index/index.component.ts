import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiServiceService} from '../shared/services/api-service.service';
import {Empresa} from '../shared/models/general';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {EmpresaModalComponent} from '../empresa-modal/empresa-modal.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  columnas = ['nom_estab', 'razon_social', 'acciones'];

  public datos: MatTableDataSource<Empresa>;

  busquedaQuery = '';

  offset = 0;

  total = 0;

  firstTime = true;

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private service: ApiServiceService,
              private router: Router,
              private dialogEmpresa: MatDialog) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.service.getEmpresas(this.busquedaQuery, this.offset).subscribe(data => {
      this.datos = new MatTableDataSource<Empresa>(data);
      if (this.firstTime) {
        this.total = this.service.TOTAL;
        this.datos.paginator = this.paginator;
        this.firstTime = false;
      }
    }, error => {
      Swal.fire('Error', error.error.Data.sqlMessage, 'error');
      this.datos = new MatTableDataSource<Empresa>([]);
    });
  }

  editarEmpresa(id) {
    this.router.navigate(['/detail/', '' + id.ID_empresa]);
  }

  buscar() {
    this.reloadData();
  }

  crearNuevo() {
    this.openModal();
  }

  private openModal()  {
    const dialogRef = this.dialogEmpresa.open(EmpresaModalComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reloadData();
      }
    });
  }

  next($event) {
    console.log($event);
    const index = $event.pageIndex * 50;
    this.offset = index;
    this.reloadData();
  }

  eliminarEmpresa(id) {
    Swal.fire({
      title: 'Eliminar empresa',
      text: '¿Estas seguro que deseas eliminar esta empresa?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar!',
    }).then(result => {
      if (result.value) {
        const ids = id.ID_empresa;
        this.service.eliminarEmpresa(ids).subscribe(result => {
          Swal.fire('Exito', 'Empresa eliminada', 'success');
          this.reloadData();
        }, error => {
          Swal.fire('Error', error.error.Data.sqlMessage, 'error');
        });
      }
    });
  }
}
