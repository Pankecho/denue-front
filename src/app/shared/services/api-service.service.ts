import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Empresa, Respuesta, Ubicacion, Usuario} from '../models/general';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  URL_HOST = 'http://localhost:3000';
  URL_EMPRESA = 'empresa';
  URL_UBICACION = 'ubicacion';

  TOTAL = 0;

  constructor(private http: HttpClient) {
  }

  getEmpresas(cadena = '', offset = 0): Observable<Empresa[]> {
    return this.http.get(`${this.URL_HOST}/${this.URL_EMPRESA}?limit=50&offset=${offset}&query=${cadena}`).pipe(
      map(res => {
        const d = res as Respuesta;
        this.TOTAL = d.Data.Total;
        return d ? <Empresa[]> (d.Data.Empresas) : [];
      })
    );
  }

  getEmpresa(id): Observable<Empresa> {
    return this.http.get(`${this.URL_HOST}/${this.URL_EMPRESA}/${id}`).pipe(
      map(res => {
        const d = res as Respuesta;
        return d ? <Empresa> (d.Data) : null;
      })
    );
  }

  createEmpresa(empresa: Empresa): Observable<Respuesta> {
    return this.http.post(`${this.URL_HOST}/${this.URL_EMPRESA}`, empresa).pipe(
      map(res => {
        const d = res as Respuesta;
        return d;
      })
    );
  }

  updateEmpresa(empresa: Empresa): Observable<Respuesta> {
    return this.http.put(`${this.URL_HOST}/${this.URL_EMPRESA}/${empresa.ID_empresa}`, empresa).pipe(
      map(res => {
        const d = res as Respuesta;
        return d;
      })
    );
  }

  eliminarEmpresa(id): Observable<Respuesta> {
    return this.http.delete(`${this.URL_HOST}/${this.URL_EMPRESA}/${id}`).pipe(
      map(res => {
        const d = res as Respuesta;
        return d;
      })
    );
  }

  eliminarEmpresas(ids): Observable<Respuesta> {
    return this.http.post(`${this.URL_HOST}/${this.URL_EMPRESA}/delete`, ids).pipe(
      map(res => {
        const d = res as Respuesta;
        return d;
      })
    );
  }

  getCSV(id): Observable<Respuesta> {
    return this.http.get(`${this.URL_HOST}/${this.URL_EMPRESA}/${id}/csv`).pipe(
      map(res => {
        const d = res as Respuesta;
        return d;
      })
    );
  }

  updateUbicacion(ubicacion: Ubicacion): Observable<Respuesta> {
    return this.http.put(`${this.URL_HOST}/${this.URL_UBICACION}/${ubicacion.ID_empresa}`, ubicacion).pipe(
      map(res => {
        const d = res as Respuesta;
        return d;
      })
    );
  }

  login(usuario: Usuario): Observable<Respuesta> {
    return this.http.post(`${this.URL_HOST}/login`, usuario).pipe(
      map(res => {
        const d = res as Respuesta;
        return d;
      })
    );
  }
}
