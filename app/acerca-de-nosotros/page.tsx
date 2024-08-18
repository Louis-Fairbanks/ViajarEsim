import Header from '../components/HeaderComponents/Header'
import FooterAbove from '../components/HomeSections/FooterAbove'
import Footer from '../components/HomeSections/Footer'
import Image from 'next/image';
import TopBar from '../components/HeaderComponents/TopBar';
import AdvantageBlurb from '../components/ReusableComponents/AdvantageBlurb';
import ScrollDownButton from './ScrollDownButton';

const page = () => {

    return (
        <>
            <div className='flex flex-col h-screen'>
                <TopBar />
                <Header />
                <Image className='w-full'
                    src='/media/fondoOlas.png'
                    alt=''
                    width={650}
                    height={78}
                />
                <Image className='absolute top-128 right-128'
                    src='/media/nube-completa.png'
                    alt=''
                    width={300}
                    height={300}
                />
                <div className='flex-grow h-full px-64 text-center border-b-custom flex flex-col items-center relative overflow-hidden'>
                    <Image className='absolute -right-64 top-64 scale-200'
                        src='/media/sun.svg'
                        alt=''
                        width={200}
                        height={200}
                    />
                    <Image className='absolute left-0'
                        src='/media/avioncito.png'
                        alt=''
                        width={300}
                        height={200}
                    />
                    <Image className='absolute -bottom-64 left-256 scale-150'
                        src='/media/earth-1.svg'
                        alt=''
                        width={200}
                        height={200}
                    />
                    <Image className='absolute -bottom-32 right-256 -rotate-90'
                        src='/media/puntitos.png'
                        alt=''
                        width={100}
                        height={100}
                    />
                    <div className='flex flex-col space-y-16 items-center'>
                        <h1 className='font-medium leading-body text-hero'>¿Quiénes somos?</h1>
                        <p>Somos quienes damos tranquilidad, facilidad, comodidad y felicidad a<br></br>
                            los viajeros de este mundo.</p>
                        <ScrollDownButton/>
                    </div>
                </div>
            </div>
            <div className='p-64 relative scrollableSection'>
                <Image className='absolute top-16 left-0'
                    src='/media/rosa.png'
                    alt=''
                    height={266}
                    width={198}
                />
                <div className='flex justify-between items-center space-x-256' >
                    <div className='flex flex-col space-y-12'>
                        <h1 className='font-semibold text-large-heading leading-body'>Nuestro Compromiso</h1>
                        <p>
                            En ViajareSIM, nos comprometemos a seguir innovando y mejorando nuestros servicios para ofrecerte la mejor experiencia posible. Entendemos que cada viaje es único y puede presentar diferentes desafíos de conectividad. Por eso, trabajamos incansablemente para asegurarnos de que siempre tengas acceso a soluciones de datos móviles de alta calidad, independientemente de tu destino.
                        </p>
                    </div>
                    <Image
                        src='/media/quienes-somos.png'
                        alt=''
                        width={450}
                        height={457}
                    />
                </div>
            </div>
            <div className='p-64 relative'>
                <Image className='absolute -top-32 right-0'
                    src='/media/estrella.png'
                    alt=''
                    height={250}
                    width={193}
                />
                <div className='flex justify-between items-center space-x-256'>
                    <Image
                        src='/media/quienes-somos2.png'
                        alt=''
                        width={450}
                        height={457}
                    />
                    <div className='flex flex-col space-y-12'>
                        <h1 className='font-semibold text-large-heading leading-body'>La solución que brindamos</h1>
                        <p>
                            En ViajareSIM, ofrecemos una solución eSIM que te permite activar planes de datos móviles al instante y sin complicaciones. Disfruta de datos low cost y sin cargos de roaming en más de 100 países con una configuración rápida y sencilla. Nuestra eSIM te brinda comodidad y flexibilidad, permitiéndote gestionar tu conectividad desde tu dispositivo, con soporte 24/7 para asistirte en todo momento.
                        </p>
                    </div>
                </div>
            </div>
            <div className='p-64 relative'>
                <Image className='absolute top-0 -left-64 scale-150'
                    src='/media/lamparita.svg'
                    alt=''
                    height={266}
                    width={198}
                />
                <div className='flex justify-between items-center space-x-256' >
                    <div className='flex flex-col space-y-12'>
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
            <div className='p-64 space-y-48 flex justify-center'>
                <div className='flex flex-col space-y-12 text-center w-3/4'>
                    <h1 className='font-semibold text-large-heading leading-body'>Nuestros Valores</h1>
                    <p>En ViajareSIM, nuestros valores fundamentales guían cada aspecto de nuestro negocio y nos ayudan a proporcionar un servicio excepcional a nuestros clientes. Estos valores reflejan nuestro compromiso con la calidad, la innovación y la satisfacción del cliente, y son la base sobre la cual construimos nuestras relaciones y desarrollamos nuestras soluciones.</p>
                </div>
            </div>
            <div className='flex space-x-48 p-64'>
                <AdvantageBlurb
                    heading="Innovación"
                    info='Buscamos constantemente mejorar y ofrecer soluciones fáciles de usar.'
                    imgPath='/media/varita.svg'/>
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
