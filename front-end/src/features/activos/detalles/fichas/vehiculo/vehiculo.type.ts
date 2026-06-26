export interface Vehiculo {

  anio: number;

  chasis: string;

  kilometraje: number;

  marca: {
    id: number;
    nombre: string;
  };

  modelo: {
    id: number;
    nombre: string;
  };

  tipoVehiculo: {
    id: number;
    nombre: string;
  };

}