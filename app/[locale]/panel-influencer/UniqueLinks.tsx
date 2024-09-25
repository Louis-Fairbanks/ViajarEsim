import React from 'react'

const data = [
  { enlace: '/ivanlatam', clics: 10, ventas: 5, total: 15, tasaDeConversion: 0.5, ganancias: 100 },
  { enlace: '/ivanlatam25', clics: 20, ventas: 10, total: 30, tasaDeConversion: 0.33, ganancias: 200 },
  // More data...
];

const UniqueLinks = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-8 text-left">Enlace</th>
              <th className="border border-gray-300 px-4 py-8 text-left">Clics</th>
              <th className="border border-gray-300 px-4 py-8 text-left">Ventas</th>
              <th className="border border-gray-300 px-4 py-8 text-left">Total de Compras</th>
              <th className="border border-gray-300 px-4 py-8 text-left">Tasa de Conversión</th>
              <th className="border border-gray-300 px-4 py-8 text-left">Comisión</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border border-gray-300 px-4 py-8">{item.enlace}</td>
                <td className="border border-gray-300 px-4 py-8">{item.clics}</td>
                <td className="border border-gray-300 px-4 py-8">{item.ventas}</td>
                <td className="border border-gray-300 px-4 py-8">{item.total}</td>
                <td className="border border-gray-300 px-4 py-8">{item.tasaDeConversion.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-8">${item.ganancias.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UniqueLinks