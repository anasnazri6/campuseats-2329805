
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth.js'
import { NavLink, useNavigate } from 'react-router'

function Header() {
  const { count } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <header className="header">
      <h1 className="logo">
        <NavLink to="/" className="logo-link">
          CampusEats
        </NavLink>
      </h1>

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

        {user ? (
          <>
            <span className="user-name">
              Hi, {user.displayName || user.email}
            </span>

            <button
              type="button"
              className="link"
              onClick={handleLogout}
            >
              Log out
            </button>
          </>
        ) : (
          <NavLink to="/login" className="link">
            Log in
          </NavLink>
        )}
      </nav>
    </header>
  )
}

export default Header
