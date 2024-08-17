import React from 'react'
import { notFound } from 'next/navigation'
import { Regiones } from '../components/Regiones'

interface Props {
  params: { region : string[] }
}

interface Region {
  header: string;
  imgPath: string;
  alt: string;
  popular: boolean;
  ISOcode: string;
}

const page = ({ params } : Props) => {
  
  const regionName = params.region[0]
  const region : Region | undefined = Regiones.find(region => {regionName === region.header.toLowerCase().replace(/ /g, '-')})

  if(!region){
    notFound
  }

  return (
    <div>
      <h1>{region?.ISOcode}</h1>
    </div>
  )
}

export default page
