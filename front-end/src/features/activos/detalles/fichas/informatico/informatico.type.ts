export interface Informatico {

  numeroSerie: string;

  procesador: string;

  memoriaRam: number;

  almacenamientoGB: number;

  marca: {
    id: number;
    nombre: string;
  };

  modelo: {
    id: number;
    nombre: string;
  };

  tipoEquipo: {
    id: number;
    nombre: string;
  };

  sistemaOperativo: {
    id: number;
    nombre: string;
  };

}