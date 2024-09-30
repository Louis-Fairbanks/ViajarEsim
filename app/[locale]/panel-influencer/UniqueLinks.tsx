import React from 'react'

interface affiliate_links {
  url : string,
  clics: number,
  sales: number,
  total_sales: number
}
interface Props {
  affiliateLinksInformation: affiliate_links[]
  comission: number
}
const UniqueLinks = ({affiliateLinksInformation, comission} : Props) => {


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
            {affiliateLinksInformation.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border border-gray-300 px-4 py-8">/{item.url}</td>
                <td className="border border-gray-300 px-4 py-8">{item.clics}</td>
                <td className="border border-gray-300 px-4 py-8">{item.sales}</td>
                <td className="border border-gray-300 px-4 py-8">{item.total_sales}</td>
                <td className="border border-gray-300 px-4 py-8">%{comission}</td>
                <td className="border border-gray-300 px-4 py-8">${((comission /100) * item.total_sales).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UniqueLinks