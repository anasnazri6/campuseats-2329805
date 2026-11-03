import { useCart } from '../hooks/useCart'
import { NavLink } from 'react-router'

function Header() {
  const { count } = useCart()

  return (
    <header className="header">
      <h1 className="logo">
<NavLink to="/" className="logo-link">
  CampusEats
</NavLink>      </h1>

      <nav className="nav">
        <NavLink to="/" end className="link">
          Vendors
        </NavLink>

        <NavLink to="/cart" className="link">
          Cart <span className="badge">{count}</span>
        </NavLink>

        <NavLink to="/orders" className="link">
          Orders
        </NavLink>
      </nav>
    </header>
  )
}

export default Header