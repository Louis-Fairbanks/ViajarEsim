'use client'
import React, { useEffect, useState } from 'react'
import { InfluencerInformation } from '../components/Types/TInfluencerInformation'
import InfluencerTableRow from './InfluencerTableRow'

const InfluencerInfo = () => {

    const [err, setErr] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [influencerData, setInfluencerData] = useState<InfluencerInformation[]>([])

    useEffect(() => {
        const getInfluencerData = async () => {
            const influencerJson = await fetch('/api/afiliados/influencers')

            if (!influencerJson) {
                setErr('Hubo un error al cargar la data de los influencers')
            }
            else {
                const influencerData = await influencerJson.json()
                setInfluencerData(influencerData)
                setLoading(false)
            }
        }
        getInfluencerData();
    }, [])


    return (
        <>
            {err != '' && <div>{err}</div>}
            {loading && <div>Cargando data de influencers...</div>}
            <table>
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-3 text-left"></th>
                        <th className="border border-gray-300 p-3 text-left">Influencer</th>
                        <th className="border border-gray-300 p-3 text-left">Link</th>
                        <th className="border border-gray-300 p-3 text-left">Clics</th>
                        <th className="border border-gray-300 p-3 text-left">Código Descuento</th>
                        <th className="border border-gray-300 p-3 text-left">Veces Aplicado</th>
                        <th className="border border-gray-300 p-3 text-left">Ventas Generadas</th>
                        <th className="border border-gray-300 p-3 text-left">Ingreso Generado</th>
                        <th className="border border-gray-300 p-3 text-left">% comisión</th>
                        <th className="border border-gray-300 p-3 text-left">Ganancias</th>
                    </tr>
                </thead>
                <tbody className='overflow-y-auto max-h-512'>
                    {influencerData.map((influencer, index) => (
                        <InfluencerTableRow key={index} influencer={influencer} index={index} />
                    ))}
                </tbody>
            </table>
        </>

    )
}

export default InfluencerInfo
