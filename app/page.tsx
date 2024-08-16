import Header from "./components/HeaderComponents/Header";
import TopBar from "./components/HeaderComponents/TopBar";
import Image from "next/image";
import Search from "./components/ReusableComponents/Search";
import Advantages from "./components/HomeSections/Advantages";
import NextTrip from "./components/HomeSections/NextTrip";
import StepByStep from "./components/HomeSections/StepByStep";
import Benefits from "./components/HomeSections/Benefits";
import Testimonials from "./components/HomeSections/Testimonials";
import PaymentMethods from "./components/HomeSections/PaymentMethods";
import Faqs from "./components/HomeSections/Faqs";
import FooterAbove from "./components/HomeSections/FooterAbove";
import Footer from "./components/HomeSections/Footer";


export default function Home() {
  return (<>
    <div className="max-h-screen flex flex-col">
      <TopBar />
      <Header />
      <div className='flex overflow-y-hidden'>
        <div className='flex flex-col w-1/2 px-64 justify-center relative'>
          <p className="text-text-faded">eSim Internacional</p>
          <h1 className="text-hero font-medium leading-body tracking-tight">
            Mantén tu conexión <span className='font-bold text-primary whitespace-nowrap'>estés donde estés.</span>
          </h1>
          <p>¿Preparando tu próximo viaje? Con ViajareSIM, disfruta de internet de alta velocidad sin limites y olvidate de las costosas tarifas de roaming.</p>
          <Search/>
        </div>
        <div className='w-1/2 h-full flex justify-center items-center relative ml-auto'>
          <Image className="absolute bottom-128 left-0 -mt-32"
            src="/media/cebolla.png"
            alt=''
            width={200}
            height={200}
          />
          <Image
            src="/media/imagen-heroe-cuadrado.png"
            alt="mano con celular"
            width={3620}
            height={3620}
          />
        </div>
      </div>
    </div>
    <Advantages />
    <NextTrip />
    <StepByStep />
    <Benefits />
    <Testimonials />
    <PaymentMethods />
    <Faqs />
    <FooterAbove />
    <Footer />
  </>
  );
}