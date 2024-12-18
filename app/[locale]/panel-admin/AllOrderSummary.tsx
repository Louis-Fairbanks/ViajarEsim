'use client'
import React, { useEffect, useState } from 'react'
import { OrderObject } from '../components/Types/TOrderObject'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import TableRow from './TableRow'
import { Search } from '@mui/icons-material'

const AllOrderSummary = () => {
    const [orderData, setOrderData] = useState<OrderObject[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [err, setErr] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [searchQuery, setSearchQuery] = useState<string>('')

    useEffect(() => {
        const fetchOrderData = async () => {
            setIsLoading(true)
            let url = `/api/orders?page=${page}&limit=15`
            if (searchQuery) {
                url += `&search=${encodeURIComponent(searchQuery)}`
            }
            try {
                const orderResponse = await fetch(url)
                if (!orderResponse.ok) {
                    throw new Error('Error fetching order data')
                }
                const orderDataJson = await orderResponse.json()
                setIsLoading(false)
                setTotalPages(orderDataJson.pagination.totalPages)
                setOrderData(orderDataJson.data)
            } catch (error) {
                setIsLoading(false)
                setErr('Error fetching order data')
            }
        }
        fetchOrderData()
    }, [page, searchQuery])

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearchQuery(searchTerm)
        setPage(1) // Reset to first page when searching
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    return (
        <>
            {isLoading && <div>Cargando data de ordenes...</div>}
            {err !== '' && <div>{err}</div>}
            <form className='flex w-2/3 ml-auto mb-12' onSubmit={handleSearch}>
                <input 
                    className='w-full border-custom rounded-custom' 
                    placeholder='Buscar por iccid, nombre, apellido, correo, celular, o # de compra'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ButtonDark type='submit' extraClasses='p-8'><Search /></ButtonDark>
            </form>
            <table className='w-full border-collapse bg-white shadow-md rounded-custom'>
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-3 text-left"></th>
                        <th className="border border-gray-300 p-3 text-left">Fecha</th>
                        <th className="border border-gray-300 p-3 text-left">° Orden</th>
                        <th className="border border-gray-300 p-3 text-left">Nombre</th>
                        <th className="border border-gray-300 p-3 text-left">Apellido</th>
                        <th className="border border-gray-300 p-3 text-left">Correo</th>
                        <th className="border border-gray-300 p-3 text-left">Celular</th>
                        <th className="border border-gray-300 p-3 text-left">Método de Pago</th>
                        <th className="border border-gray-300 p-3 text-left">Estado</th>
                        <th className="border border-gray-300 p-3 text-left">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orderData.map((order, index) => (
                        <TableRow key={order.numeroOrden} index={index} order={order} />
                    ))}
                </tbody>
            </table>
            <div className='flex mt-12 flex-wrap'>
                {Array.from({ length: totalPages }, (_, i) => (
                    <ButtonDark
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        extraClasses={`mx-1 px-3 py-1 border rounded ${page === i + 1 ? 'bg-primary active:bg-primary focus:bg-primary' : 'bg-text-faded'}`}
                    >
                        {i + 1}
                    </ButtonDark>
                ))}
            </div>
        </>
    )
}

export default AllOrderSummary