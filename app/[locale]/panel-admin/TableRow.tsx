'use client'
import React, { useState } from 'react'
import { OrderObject } from '../components/Types/TOrderObject'
import { KeyboardArrowRight } from '@mui/icons-material'
import { Link } from '@/routing'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import EmailSending from './EmailSending'
import PaymentConfirmationEmailForm from './PaymentConfirmationEmailForm'
import { useSession } from 'next-auth/react'
import ButtonLight from '../components/ReusableComponents/ButtonLight'
import { useRouter } from '@/routing'

interface Props {
    index: number
    order: OrderObject
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

const TableRow = ({ order, index }: Props) => {
    const router = useRouter();
    const session = useSession();
    const [opened, setOpened] = useState<boolean>(false)
    const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false)
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false)
    const [isRefundModalOpen, setIsRefundModalOpen] = useState<boolean>(false)
    const [selectedPlan, setSelectedPlan] = useState<any>(null)

    function openEmailModal(plan: any) {
        setSelectedPlan(plan)
        setIsEmailModalOpen(true)
    }

    function closeEmailModal() {
        setIsEmailModalOpen(false)
        setSelectedPlan(null)
    }

    function openConfirmationModal() {
        setIsConfirmationModalOpen(true)
    }

    function openRefundModal() {
        setIsRefundModalOpen(true);
    }

    function closeConfirmationModal() {
        setIsConfirmationModalOpen(false)
    }

    function closeRefundModal() {
        setIsRefundModalOpen(false);
    }

    function renderEmailSending() {
        if (!isEmailModalOpen || !selectedPlan) return null;

        return (
            <>
                <div className='fixed inset-0 bg-black bg-opacity-50 z-40' onClick={closeEmailModal}></div>
                <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full'>
                    <EmailSending
                        userFirstName={order.nombre}
                        userLastName={order.apellido}
                        orderNumber={order.numeroOrden}
                        email={order.correo}
                        regionName={selectedPlan.region}
                        data={selectedPlan.data || ''}
                        duration={selectedPlan.duration || ''}
                        qrcode={selectedPlan.qrcode || ''}
                        iccid={selectedPlan.iccid || ''}
                        locale={order.locale}
                        close={closeEmailModal}
                    />
                </div>
            </>
        )
    }
    function renderConfirmationEmailSending() {
        if (!isConfirmationModalOpen) return null;

        return (
            <>
                <div className='fixed inset-0 bg-black bg-opacity-50 z-40' onClick={closeConfirmationModal}></div>
                <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full'>
                    <PaymentConfirmationEmailForm
                        order={order}
                        close={closeConfirmationModal}
                    />
                </div>
            </>
        )
    }
    function renderRefundModal() {
        if (!isRefundModalOpen) return null;

        const handleRefund = async () => {
            try {
                await fetch(`/api/orders/reembolsos/${order.numeroOrden}`, {
                    method: 'POST',
                });
            } catch (error) {
                console.error('Error processing refund:', error);
            }
            closeRefundModal();
        };

        return (
            <>
                <div className='fixed inset-0 bg-black bg-opacity-50 z-40' onClick={closeRefundModal}></div>
                <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white p-8 rounded'>
                    <p className='text-center p-16'>
                        Marcar esta compra {order.numeroOrden} como reembolsada?
                    </p>
                    <div className='flex justify-center gap-12'>
                        <ButtonDark extraClasses='px-16' onClick={handleRefund}>
                            Sí
                        </ButtonDark>
                        <ButtonLight extraClasses='px-12 py-8' onClick={closeRefundModal}>
                            No
                        </ButtonLight>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <tr
                className={`${!order.ordenCompletada ? 'bg-red-500' : order.reembolsado ? 'bg-yellow' :
                    index % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white hover:bg-gray-100'}  cursor-pointer`}
                onClick={() => setOpened(!opened)}
            >
                <td className="border border-gray-300 p-3">
                    <KeyboardArrowRight className={`transition-all ease-linear duration-300 ${opened ? 'rotate-90' : ''}`} />
                </td>
                <td className="border border-gray-300 p-3">{formatDate(order.fecha)}</td>
                <td className="border border-gray-300 p-3">{order.numeroOrden}</td>
                <td className="border border-gray-300 p-3">{order.nombre}</td>
                <td className="border border-gray-300 p-3">{order.apellido}</td>
                <td className="border border-gray-300 p-3">{order.correo}</td>
                <td className="border border-gray-300 p-3">{order.celular}</td>
                <td className="border border-gray-300 p-3">{order.metodoPago}</td>
                <td className="border border-gray-300 p-3">{!order.ordenCompletada ? 'Fallido' : order.reembolsado ? 'Reembolsado' : 'Completado'}</td>
                <td className="border border-gray-300 p-3">
                    ${Number(order.total).toLocaleString('ES-es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
            </tr>
            <tr>
                <td colSpan={10} className='p-0 w-full'>
                    <div className={`flex flex-col w-full transition-all duration-300 ease-linear overflow-y-hidden ${opened ? 'max-h-[500px]' : 'max-h-0'}`}>
                        {/* First subtable: Plans */}
                        <div className='flex w-full'>
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 p-8 text-left"></th>
                                        <th className="border border-gray-300 p-8 text-left">Nombre</th>
                                        <th className="border border-gray-300 p-8 text-left">Región</th>
                                        {(session?.data?.user.access === 'Completo' || session?.data?.user.email === 'viajaresimoficial@gmail.com') &&
                                            <th className="border border-gray-300 p-8 text-left">Proveedor</th>
                                        }
                                        <th className="border border-gray-300 p-8 text-left">ICCID</th>
                                        <th className="border border-gray-300 p-8 text-left">Código QR</th>
                                        <th className="border border-gray-300 p-8 text-left">Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.planes.map((plan, planIndex) => (
                                        plan.iccid && (
                                            <tr key={planIndex} className="bg-gray-100">
                                                <td className="border border-gray-300 p-8">
                                                    <ButtonDark extraClasses='mt-2 p-8' onClick={() => openEmailModal(plan)}>
                                                        Reenviar Email
                                                    </ButtonDark>
                                                </td>
                                                <td className="border border-gray-300 p-8">{plan.nombre}</td>
                                                <td className="border border-gray-300 p-8">{plan.region}</td>
                                                {
                                                    (session?.data?.user.access === 'Completo' || session?.data?.user.email === 'viajaresimoficial@gmail.com') &&
                                                    <td className="text-primary underline border border-gray-300 p-8 text-left">
                                                        <Link href={`${plan.proveedor === 'eSIMaccess' ? 'https://console.esimaccess.com/login' :
                                                            plan.proveedor === 'microesim' ? 'https://microesim.top/user' : 'https://portal.esim-go.com'}`} target='_blank'>
                                                            {plan.proveedor}
                                                        </Link>
                                                    </td>}
                                                <td className="border border-gray-300 p-8">{plan.iccid}</td>
                                                <td className="border border-gray-300 p-8">{plan.qrcode}</td>
                                                <td className="border border-gray-300 p-8">
                                                    ${Number(plan.precio).toLocaleString('ES-es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex ml-auto w-3/4'>
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 p-8 text-left"></th>
                                        <th className="border border-gray-300 p-8 text-left"></th>
                                        <th className="border border-gray-300 p-8 text-left">Influencer</th>
                                        <th className="border border-gray-300 p-8 text-left">Descuento Usado</th>
                                        <th className="border border-gray-300 p-8 text-left">Ahorros</th>
                                        <th className="border border-gray-300 p-8 text-left">Monto Pagado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-100">
                                        <td className="border border-gray-300 p-8">
                                            <ButtonDark extraClasses='mt-2 p-8' onClick={() => { openRefundModal(); }}>
                                                Marcar como reembolsado
                                            </ButtonDark>
                                        </td>
                                        <td className="border border-gray-300 p-8">
                                            <ButtonDark extraClasses='mt-2 p-8' onClick={() => { openConfirmationModal(); }}>
                                                Reenviar Confirmación de Compra
                                            </ButtonDark>
                                        </td>
                                        <td className="border border-gray-300 p-8">{order.influencer || '-'}</td>
                                        <td className="border border-gray-300 p-8">{order.codigoDescuento || '-'}</td>
                                        <td className="border border-gray-300 p-8">
                                            {order.porcentajeDescuento
                                                ? `$${Number(((order.porcentajeDescuento / 100) / (1 - order.porcentajeDescuento / 100)) * order.total).toLocaleString('ES-es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                                : '0'}
                                        </td>
                                        <td className='border border-gray-300 p-8'>{order.moneda}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </td>
            </tr>
            {renderEmailSending()}
            {renderConfirmationEmailSending()}
            {renderRefundModal()}
        </>
    );
}

export default TableRow