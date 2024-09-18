import React from 'react'

const data = [
  { codigo: 'IVANLATAM10', vecesAplicado: 50, ahorrosTotales: 20 },
  { codigo: 'IVANLATAM25', vecesAplicado: 30, ahorrosTotales: 40 },
  { codigo: 'IVANPROMO', vecesAplicado: 75, ahorrosTotales: 50 },
  // More data...
];

const DiscountCodes = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-3 text-left">Código</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Veces aplicado</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Ahorros totales</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                <td className="border border-gray-300 px-4 py-3">{item.codigo}</td>
                <td className="border border-gray-300 px-4 py-3">{item.vecesAplicado}</td>
                <td className="border border-gray-300 px-4 py-3">${item.ahorrosTotales.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DiscountCodes