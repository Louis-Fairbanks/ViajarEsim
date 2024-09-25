import FooterAbove from '../components/HomeSections/FooterAbove'
import Footer from '../components/HomeSections/Footer'
import Image from 'next/image';
import ScrollDownButton from './ScrollDownButton';
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader';
import OurValues from './OurValues';
import ChatScript from '../components/ReusableComponents/ChatScript';
import { useTranslations } from 'next-intl';

const page = () => {

    const translations = useTranslations('QuienesSomos')

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
                        <h1 className='font-medium leading-body text-hero whitespace-nowrap'>{translations('quienesSomos')}</h1>
                        <p>{translations('somosQuienes')}</p>
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
                        <h1 className='font-semibold text-large-heading leading-body'>{translations('queEsViajareSIM')}</h1>
                        <p>{translations('nosotrosSomos')}</p>
                    </div>
                    <Image
                        src='/media/quienes-somos.png'
                        alt=''
                        width={450}
                        height={457}
                    />
                </div>
                <div className="border-t border-accent h-1 w-full"></div>
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
                            {translations('laSolucion')}</h1>
                        <p>
                       {translations('enViajareSIM')}
                        </p>
                    </div>
                </div>
                <div className="border-t border-accent h-1 w-full"></div>
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
                        <h1 className='font-semibold text-large-heading leading-body'>{translations('nuestraMision')}</h1>
                        <p>
                            {translations('nuestraMisionEs')}
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
                    <h1 className='font-semibold text-large-heading leading-body'>{translations('nuestrosValores')}</h1>
                    <p>{translations('nuestrosValoresTexto')}</p>
                </div>
            </div>
            <OurValues/>
            <FooterAbove />
            <Footer />
            <ChatScript/>
        </>
    )
}

export default page
