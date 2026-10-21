
import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [cart, setCart] = useState([])
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [view, setView] = useState('menu')

  useEffect(() => {
    const controller = new AbortController()

    async function loadVendors() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch('/api/vendors.json', {
          signal: controller.signal,
        })

        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const data = await res.json()
        setVendors(data)
        setSelectedVendorId((currentId) =>
          currentId && data.some((v) => v.id === currentId)
            ? currentId
            : data[0]?.id ?? null
        )
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadVendors()
    return () => controller.abort()
  }, [reloadKey])

  const selectedVendor = vendors.find(
    (v) => v.id === selectedVendorId
  )

  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (line) => line.item.id === item.id
      )

      if (existing) {
        return prevCart.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      return [...prevCart, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + delta }
            : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function handleRemove(itemId) {
    setCart((prevCart) =>
      prevCart.filter((line) => line.item.id !== itemId)
    )
  }

  const cartCount = cart.reduce(
    (total, line) => total + line.qty,
    0
  )

  const cartTotal = cart.reduce(
    (total, line) => total + line.item.price * line.qty,
    0
  )

  let content

  if (view === 'cart') {
    content = (
      <section>
        <h2 className="section-title">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="muted">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((line) => (
                <li className="cart-line" key={line.item.id}>
                  <div>
                    <p className="cart-name">{line.item.name}</p>
                    <p className="price">
                      RM {line.item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="qty">
                    <button
                      onClick={() =>
                        handleChangeQty(line.item.id, -1)
                      }
                      aria-label={`Decrease ${line.item.name} quantity`}
                    >
                      -
                    </button>

                    <span>{line.qty}</span>

                    <button
                      onClick={() =>
                        handleChangeQty(line.item.id, 1)
                      }
                      aria-label={`Increase ${line.item.name} quantity`}
                    >
                      +
                    </button>
                  </div>

                  <p className="line-total">
                    RM {(line.item.price * line.qty).toFixed(2)}
                  </p>

                  <button
                    className="link danger"
                    onClick={() => handleRemove(line.item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <p className="cart-total">
              Total: RM {cartTotal.toFixed(2)}
            </p>

            <button
              className="btn"
              onClick={() => setView('done')}
            >
              Place Order
            </button>
          </>
        )}
      </section>
    )
  } else if (view === 'done') {
    content = (
      <section>
        <h2 className="section-title">Order Placed!</h2>
        <p>Your order has been placed successfully.</p>
        <p>Total: RM {cartTotal.toFixed(2)}</p>

        <button
          className="btn"
          onClick={() => {
            setCart([])
            setView('menu')
          }}
        >
          Back to Vendors
        </button>
      </section>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((key) => key + 1)}
      />
    )
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>

          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        {selectedVendor && (
          <section>
            <h2 className="section-title">
              Menu: {selectedVendor.name}
            </h2>

            <MenuList
              items={selectedVendor.menu}
              onAdd={handleAddToCart}
            />
          </section>
        )}
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />

      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App
