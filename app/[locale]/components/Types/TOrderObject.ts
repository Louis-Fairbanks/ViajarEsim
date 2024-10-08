export interface OrderObject {
  fecha: string;
  numeroOrden: number;
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  metodoPago: string;
  ordenCompletada: boolean;
  total: number;
  influencer: string;
  codigoDescuento: string;
  porcentajeDescuento: number;
  planes: {
      iccid: string;
      nombre: string;
      proveedor: string;
      precio: number;
      region: string;
  }[];
}