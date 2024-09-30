import React from 'react'

interface purchases {
  fecha: string,
  total: number,
  purchase_id: number, //need to add 1000000 to this
  discount_code: string,
  plans: {
    plan_id: number,
    plan_name: string,
    cantidad: number,
    region_id: number,
    region_name: string
  }[]
}

interface Props {
  purchasesInformation: purchases[],
  comission: number
}

const GeneratedPurchases = ({purchasesInformation, comission} : Props) => {
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
            {purchasesInformation.map((item, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                <td className="border border-gray-300 px-4 py-3">{new Date(item.fecha).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-3">{item.purchase_id + 1000000}</td>
                <td className="border border-gray-300 px-4 py-3">
                  <ul className="list-disc pl-5">
                    {item.plans.map((plan, planIndex) => (
                      <li key={planIndex}>
                        {plan.plan_name} - {plan.region_name} - 1
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border border-gray-300 px-4 py-3">${item.total.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-3">{item.discount_code || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-3">${(item.total * comission / 100).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GeneratedPurchases