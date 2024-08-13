import Header from "./components/Header";
import TopBar from "./components/TopBar";
import Image from "next/image";
import Search from "./components/Search";
import Advantages from "./components/HomeSections/Advantages";
import NextTrip from "./components/HomeSections/NextTrip";
import StepByStep from "./components/HomeSections/StepByStep";
import Benefits from "./components/HomeSections/Benefits";


export default function Home() {
  return (<>
    <div className="max-h-screen flex flex-col">
      <TopBar />
      <Header />
      <div className='flex overflow-y-hidden'>
        <div className='flex flex-col w-1/2 px-64 justify-center relative'>
          <Image className="absolute top-16 left-0 -mt-32"
            src="/media/puntitos.png"
            alt="puntitos"
            width={100}
            height={100}
          />
          <p className="text-text-faded">eSim Internacional</p>
          <h1 className="text-hero font-medium leading-body tracking-tight">
            Explora el mundo con <span className="whitespace-nowrap">una conexión <span className='font-bold text-primary'>constante</span></span>
          </h1>
          <p>Nuestras eSIMs te permiten conectarte en más de 100 países sin preocuparte por costosos planes de roaming o cambiar tarjetas SIM. Actívala en minutos y disfruta de una conexión fiable y continua durante tus viajes.</p>
          <Search />
          <Image className="absolute bottom-8 left-16 scale-150"
            src="/media/cuadradoEsquina.png"
            alt=''
            width={100}
            height={100}
          />
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
  </>
  );
}