import React from 'react'

interface discount_codes {
  discount_code: string,
  porcentaje_descuento: number,
  times_applied: number,
  total_savings: number
}

interface Props {
  discountCodesInformation: discount_codes[]
}

const DiscountCodes = ({discountCodesInformation} : Props) => {
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
            {discountCodesInformation.map((item, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                <td className="border border-gray-300 px-4 py-3">{item.discount_code ? item.discount_code : ''}</td>
                <td className="border border-gray-300 px-4 py-3">{item.times_applied ? item.times_applied : ''}</td>
                <td className="border border-gray-300 px-4 py-3">${item.total_savings ? item.total_savings.toFixed(2) : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DiscountCodes