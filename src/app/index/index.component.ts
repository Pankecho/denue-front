import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiServiceService} from '../shared/services/api-service.service';
import {Empresa} from '../shared/models/general';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {EmpresaModalComponent} from '../empresa-modal/empresa-modal.component';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  columnas = ['select', 'nom_estab', 'razon_social', 'municipio', 'acciones'];

  public datos: MatTableDataSource<Empresa>;

  data: Empresa[] = [];

  selection = new SelectionModel<Empresa>(true, []);

  busquedaQuery = '';

  offset = 0;

  total = 0;

  firstTime = true;

  canUpdate = false;

  canDelete = false;

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private service: ApiServiceService,
              private router: Router,
              private dialogEmpresa: MatDialog) { }

  ngOnInit() {
    const current = localStorage.getItem('user');
    if (current) {
      if (current === 'adm') {
        this.canUpdate = true;
        this.canDelete = true;
      } else if (current === 'edit') {
        this.canUpdate = true;
      }
      this.reloadData();
    } else {
      this.router.navigate(['/login']);
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.data.forEach(row => this.selection.select(row));
  }

  reloadData() {
    this.service.getEmpresas(this.busquedaQuery, this.offset).subscribe(data => {
      this.data = data;
      this.datos = new MatTableDataSource<Empresa>(data);
      this.total = this.service.TOTAL;
      if (this.firstTime) {
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

  borrar() {
    const ids = this.selection.selected.map(i => {
      return i.ID_empresa;
    });
    const ob = { ids: ids };
    this.service.eliminarEmpresas(ob).subscribe(result => {
      this.selection.clear();
      Swal.fire('Exito', 'Empresas eliminadas', 'success');
      this.reloadData();

    }, error => {
      Swal.fire('Error', error.error.Data.sqlMessage, 'error');
    });
  }

  descargarCSV() {
    const ids = this.selection.selected.map(i => {
      return i.ID_empresa;
    }).join(',');
    window.location.href = `${this.service.URL_HOST}/${this.service.URL_EMPRESA}/csv?ids=${ids}`;
  }

  logout() {
    localStorage.setItem('user', null);
    this.router.navigate(['/login']);
  }
}
