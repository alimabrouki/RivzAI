import '../styles/index.css'
import '../styles/Header.css'
import { Link } from 'react-router-dom'
import {HeaderLinks} from './HeaderLinks'
import { useState } from 'react'

export const Header = () => {
 
  return (
    <div className="header">
      <HeaderLinks />
     
    </div>
  )
}