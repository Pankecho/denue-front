export interface Respuesta {
  Data: any;
  Message: string;
}

export class Empresa {
  ID_empresa: number;
  nom_estab: string;
  razon_social: string;
  ubicaciones: Ubicacion[];
}

export class Usuario {
  id_usuario: number;
  rol: string;
  contrasena: string;
}

export class Ubicacion {
  ID_empresa: number;
  tipo_vial: string;
  nom_vial: string;
  numero_ext: string;
  letra_ext: string;
  nom_CenCom: string;
  num_local: string;
  cod_postal: number;
  entidad: string;
  municipio: string;
  localidad: string;
  latitud: number;
  longitud: number;
}
