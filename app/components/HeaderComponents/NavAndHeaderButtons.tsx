'use client'
import React, { useState } from 'react'
import Nav from './Nav'
import HeaderButtons from './HeaderButtons'

const NavAndHeaderButtons = () => {

    const [destinationsClicked, setDestinationsClicked] = useState(false)

  return (
    <>
      <Nav destinationsClicked={destinationsClicked}/>
      <HeaderButtons destinationsClicked={destinationsClicked} setDestinationsClicked={setDestinationsClicked}/>
    </>
  )

}

export default NavAndHeaderButtons
