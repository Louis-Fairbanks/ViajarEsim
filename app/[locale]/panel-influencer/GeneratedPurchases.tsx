import React from 'react'

const data = [
    {
      fechaCompra: '2024-09-18',
      idOrden: '1000026',
      productosComprados: 'Colombia, 7-días, Datos Ilimitados, 1',
      valorTotal: 89.99,
      codigoDescuento: 'IVAN10',
      comisionGenerada: 9.00
    },
    {
      fechaCompra: '2024-09-17',
      idOrden: '1000027',
      productosComprados: 'Europa, 7-días, Datos Ilimitados, 3',
      valorTotal: 69.73,
      codigoDescuento: 'IVANPROMO',
      comisionGenerada: 13.00
    },
    {
      fechaCompra: '2024-09-16',
      idOrden: '1000028',
      productosComprados: 'Estados Unidos, 30-días, Datos Ilimitados, 1',
      valorTotal: 14.89,
      codigoDescuento: 'IVAN25',
      comisionGenerada: 1.48
    },
    // More data...
  ];

const GeneratedPurchases = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-3 text-left">Fecha de Compra</th>
              <th className="border border-gray-300 px-4 py-3 text-left">ID de Orden</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Productos Comprados</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Valor Total</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Código de Descuento</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Comisión Generada</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                <td className="border border-gray-300 px-4 py-3">{item.fechaCompra}</td>
                <td className="border border-gray-300 px-4 py-3">{item.idOrden}</td>
                <td className="border border-gray-300 px-4 py-3">{item.productosComprados}</td>
                <td className="border border-gray-300 px-4 py-3">${item.valorTotal.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-3">{item.codigoDescuento}</td>
                <td className="border border-gray-300 px-4 py-3">${item.comisionGenerada.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GeneratedPurchases