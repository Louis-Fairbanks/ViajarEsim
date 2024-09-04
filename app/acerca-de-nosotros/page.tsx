import FooterAbove from '../components/HomeSections/FooterAbove'
import Footer from '../components/HomeSections/Footer'
import Image from 'next/image';
import AdvantageBlurb from '../components/ReusableComponents/AdvantageBlurb';
import ScrollDownButton from './ScrollDownButton';
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader';

const page = () => {

    return (
        <>
            <div className='flex flex-col h-screen'>
                <TopBarAndHeader/>
                <Image className='w-full'
                    src='/media/fondoOlas.png'
                    alt=''
                    width={650}
                    height={78}
                />
                <Image className='hidden xl:block absolute top-128 right-128'
                    src='/media/nube-completa.png'
                    alt=''
                    width={300}
                    height={300}
                />
                <div className='flex-grow h-full px-24 sm:px-64 text-center border-b-custom flex flex-col items-center relative overflow-hidden'>
                    <Image className='hidden xl:block absolute -right-64 top-64 scale-200'
                        src='/media/sun.svg'
                        alt=''
                        width={200}
                        height={200}
                    />
                    <Image className='absolute top-128 md:top-64 xl:top-0 -left-64 sm:left-0'
                        src='/media/avioncito.png'
                        alt=''
                        width={300}
                        height={200}
                    />
                    <Image className='absolute bottom-0  sm:bottom-64 xl:-bottom-64 -right-64 sm:right-0 xl:left-256 scale-150'
                        src='/media/earth-1.svg'
                        alt=''
                        width={200}
                        height={200}
                    />
                    <Image className='hidden xl:block absolute -bottom-32 right-256 -rotate-90'
                        src='/media/puntitos.png'
                        alt=''
                        width={100}
                        height={100}
                    />
                    <div className='flex flex-col space-y-16 items-center z-[1]'>
                        <h1 className='font-medium leading-body text-hero whitespace-nowrap'>¿Quiénes somos?</h1>
                        <p>Somos quienes damos tranquilidad, comodidad y felicidad a todos los viajeros!</p>
                        <ScrollDownButton />
                    </div>
                </div>
            </div>
            <div className='p-24 sm:p-64 relative scrollableSection'>
                <Image className='absolute top-256 scale-50 sm:scale-100 -z-10 sm:top-16 -left-64 sm:left-0'
                    src='/media/rosa.png'
                    alt=''
                    height={266}
                    width={198}
                />
                <div className='flex flex-col lg:flex-row justify-between items-center lg:space-x-64 xl:space-x-256' >
                    <div className='flex flex-col sm:w-3/4 text-center lg:text-start lg:w-full space-y-12'>
                        <h1 className='font-semibold text-large-heading leading-body'>¿Qué es ViajareSIM?</h1>
                        <p>
                            Nosotros somos ViajareSIM, un servicio global de eSIM para viajeros que desean estar conectados durante sus aventuras. Ofrecemos una amplia gama de planes de datos ilimitados y flexibles en más de 150 países, con configuración rápida y asistencia por chat 24/7.
                           <br></br> Gestiona tus datos de viaje con ViajareSIM y disfruta de un acceso a internet fluido, seguro y confiable mientras exploras el mundo.</p>
                    </div>
                    <Image
                        src='/media/quienes-somos.png'
                        alt=''
                        width={450}
                        height={457}
                    />
                </div>
            </div>
            <div className='p-24 sm:p-64 relative'>
                <Image className='absolute hidden sm:block -top-32 right-0'
                    src='/media/estrella.png'
                    alt=''
                    height={250}
                    width={193}
                />
                <div className='flex flex-col-reverse lg:flex-row justify-between items-center lg:space-x-64 xl:space-x-256'>
                    <Image
                        src='/media/quienes-somos2.png'
                        alt=''
                        width={450}
                        height={457}
                    />
                    <div className='flex flex-col space-y-12 text-center lg:text-right sm:w-3/4 lg:w-full'>
                        <h1 className='font-semibold text-large-heading leading-body'>
                            La solución que brindamos</h1>
                        <p>
                        En ViajareSIM, ofrecemos una solución eSIM que te permite activar planes de datos móviles al instante y sin complicaciones. Disfruta de Internet ilimitado y sin cargos de roaming en más de 150 países con una configuración rápida y sencilla. Nuestra eSIM te brinda comodidad y flexibilidad, permitiéndote gestionar tu conectividad desde tu dispositivo, con soporte 24/7 para asistirte en todo momento.
                        </p>
                    </div>
                </div>
            </div>
            <div className='p-24 sm:p-64 relative'>
                <Image className='absolute translate-y-128 sm:translate-y-0 -z-10 top-256 sm:top-0 -left-64 scale-100 sm:scale-150'
                    src='/media/lamparita.svg'
                    alt=''
                    height={266}
                    width={198}
                />
                <div className='flex flex-col lg:flex-row justify-between items-center lg:space-x-64 xl:space-x-256' >
                    <div className='flex flex-col space-y-12 text-center lg:text-start sm:w-3/4 lg:w-full'>
                        <h1 className='font-semibold text-large-heading leading-body'>Nuestra misión</h1>
                        <p>
                        Nuestra misión en ViajareSIM es proporcionar a nuestros clientes la libertad de explorar el mundo con la tranquilidad de estar siempre conectados. Entendemos que en un mundo cada vez más interconectado, la necesidad de mantenerse en línea va más allá de la simple comunicación. Se trata de acceder a la información cuando la necesitas, de compartir momentos especiales al instante, y de tener la seguridad de que, no importa dónde estés, siempre podrás estar en contacto con tus seres queridos y con el mundo.
                        </p>
                    </div>
                    <Image
                        src='/media/quienes-somos3.png'
                        alt=''
                        width={450}
                        height={457}
                    />
                </div>
            </div>
            <div className='space-y-48 flex justify-center'>
                <div className='flex flex-col space-y-12 text-center w-3/4'>
                    <h1 className='font-semibold text-large-heading leading-body'>Nuestros Valores</h1>
                    <p>En ViajareSIM, nuestros valores fundamentales guían cada aspecto de nuestro negocio y nos ayudan a proporcionar un servicio excepcional a nuestros clientes. Estos valores reflejan nuestro compromiso con la calidad, la innovación y la satisfacción del cliente, y son la base sobre la cual construimos nuestras relaciones y desarrollamos nuestras soluciones.</p>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ga-x-48 p-24 sm:p-64'>
                <AdvantageBlurb
                    heading="Innovación"
                    info='Buscamos constantemente mejorar y ofrecer soluciones fáciles de usar.'
                    imgPath='/media/varita.svg' />
                <AdvantageBlurb
                    heading="Transparencia"
                    info='Valoramos la claridad y la honestidad, ofreciendo planes sin tarifas ocultas ni sorpresas.'
                    imgPath='/media/transparencia.svg' />
                <AdvantageBlurb
                    heading="Compromiso"
                    info='Tu satisfacción es nuestra prioridad, con soporte 24/7 y atención personalizada.'
                    imgPath='/media/compromiso.svg' />
                <AdvantageBlurb
                    heading="Accesibilidad"
                    info='Ofrecemos datos móviles asequibles, asegurando una conectividad excelente.'
                    imgPath='/media/accessibilidad.svg' />
            </div>
            <FooterAbove />
            <Footer />
        </>
    )
}

export default page
