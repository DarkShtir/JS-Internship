import React from 'react'

export const Navbar: React.FC = () => {
  return (
    <>
        <nav>
      <div className="nav-wrapper deep-purple darken-3" >
        <a href="/" className="brand-logo center">React+TypeScript</a>
        <a href="/" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        <ul className="left hide-on-med-and-down">
          <li><a href="/">Список дел</a></li>
          <li><a href="/">Информация</a></li>
        </ul>
      </div>
    </nav>
    
    <ul className="sidenav">
      <li><a href="/">Список дел</a></li>
      <li><a href="/">Информация</a></li>
    </ul>
    </>
  )
}
