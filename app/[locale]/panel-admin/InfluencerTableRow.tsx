import React, { useState } from 'react'
import { InfluencerInformation } from '../components/Types/TInfluencerInformation'
import { KeyboardArrowRight } from '@mui/icons-material'

interface Props {
    influencer: InfluencerInformation
    index: number
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    return formatter.format(date);
}

const InfluencerTableRow = ({ influencer, index }: Props) => {
    const [opened, setOpened] = useState<boolean>(false)

    return (
        <>
            <tr
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 cursor-pointer`}
                onClick={() => setOpened(!opened)}
            >
                <td className="border border-gray-300 p-3">
                    <KeyboardArrowRight className={`transition-all ease-linear duration-300 ${opened ? 'rotate-90' : ''}`} />
                </td>
                <td className="border border-gray-300 p-3">{influencer.nombre}</td>
                <td className="border border-gray-300 p-3">/{influencer.link}</td>
                <td className="border border-gray-300 p-3">{influencer.clics}</td>
                <td className="border border-gray-300 p-3">{influencer.codigoDescuento}</td>
                <td className="border border-gray-300 p-3">{influencer.vecesAplicado}</td>
                <td className="border border-gray-300 p-3">{influencer.comprasGeneradas}</td>
                <td className="border border-gray-300 p-3">
                    ${Number(influencer.ingresosGenerados).toLocaleString('ES-es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="border border-gray-300 p-3">{influencer.comision}%</td>
                <td className="border border-gray-300 p-3">
                    ${Number(influencer.ganancias).toLocaleString('ES-es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
            </tr>
            <tr>
                <td colSpan={10} className='p-0 w-full'>
                    <div className={`flex flex-col w-full transition-all duration-300 ease-linear overflow-y-hidden ${opened ? 'max-h-[500px]' : 'max-h-0'}`}>
                        <div className='flex ml-auto w-full'>
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 p-3 text-left">Fecha</th>
                                        <th className="border border-gray-300 p-3 text-left">Número de Orden</th>
                                        <th className="border border-gray-300 p-3 text-left">Precio de Venta</th>
                                        <th className="border border-gray-300 p-3 text-left">Descuento Aplicado</th>
                                        <th className="border border-gray-300 p-3 text-left">Planes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {influencer.compras.map((purchase, purchaseIndex) => (
                                        <tr key={purchaseIndex} className="bg-gray-100">
                                            <td className="border border-gray-300 p-3">{formatDate(purchase.fecha)}</td>
                                            <td className="border border-gray-300 p-3">{purchase.numeroOrden}</td>
                                            <td className="border border-gray-300 p-3">
                                                ${Number(purchase.salePrice).toLocaleString('ES-es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                            <td className="border border-gray-300 p-3">
                                                {purchase.descuentoAplicado || '-'}
                                            </td>
                                            <td className="border border-gray-300 p-3">
                                                <ul>
                                                    {purchase.plans.map((plan, planIndex) => (
                                                        <li key={planIndex}>
                                                            1x {plan.planName} - {plan.region} - {plan.duracion} días
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default InfluencerTableRow