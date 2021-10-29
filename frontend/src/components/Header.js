import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
      <div className='header-wrapper'>
        <Link to='/' className='logo'>
          <img src='/img/logo.png' alt='logo' />
        </Link>
        <ul className='nav'>
          <li>
            <Link to='#' className='nav-link'>
              NEW ARRIVALS
            </Link>
          </li>
          <li>
            <Link to='#' className='nav-link'>
              PLUS SIZE
            </Link>
          </li>
          <li>
            <Link to='#' className='nav-link'>
              LINGERIE
            </Link>
          </li>
          <li>
            <Link to='#' className='nav-link'>
              NIGHTWEAR
            </Link>
          </li>
          <li>
            <Link to='#' className='nav-link'>
              GIFTS
            </Link>
          </li>
          <li>
            <Link to='#' className='nav-link'>
              COLLECTIONS
            </Link>
          </li>
        </ul>
        <ul className='nav'>
          <li>
            <Link to='#' className='nav-link'>
              <i className='fas fa-search'></i>
            </Link>
          </li>
          <li>
            <Link to='#' className='nav-link'>
              <i className='far fa-heart'></i>
            </Link>
          </li>
          <li>
            <Link to='/login' className='nav-link'>
              <i className='far fa-user'></i>
            </Link>
          </li>
          <li>
            <Link to='/cart' className='nav-link'>
              <i className='fas fa-shopping-cart'></i>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
