
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { useCart } from '../hooks/useCart.js'
import { placeOrders } from '../services/orders.js'
import CheckoutForm from '../components/CheckoutForm.jsx'

function CartPage() {
  const navigate = useNavigate()

  const {
    cart,
    total,
    changeQty,
    removeFromCart,
    clearCart,
  } = useCart()

  const { user } = useAuth()
  const [error, setError] = useState('')

  async function handlePlaceOrder(details) {
    setError('')

    try {
    // TODO 4: await placeOrders(user, cart, details), then clearCart(), then navigate('/orders')
    await placeOrders(user, cart, details)
    clearCart()
    navigate('/orders')
  } catch (err) {
    setError(`Could not place the order: ${err.message}`)
  
    }
  }

  return (
    <section>
      <h2 className="section-title">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map(({ item, qty }) => (
              <div key={item.id} className="card cart-item">
                <div>
                  <h3>{item.name}</h3>
                  <p className="muted">
                    RM {item.price.toFixed(2)} each
                  </p>
                </div>

                <div>
                  <button
                    className="btn"
                    onClick={() => changeQty(item.id, -1)}
                  >
                    -
                  </button>

                  <span> {qty} </span>

                  <button
                    className="btn"
                    onClick={() => changeQty(item.id, 1)}
                  >
                    +
                  </button>

                  <button
                    className="btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <p className="price">
                  RM {(item.price * qty).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <h3 className="price">
            Total: RM {total.toFixed(2)}
          </h3>

          {error && (
            <p className="field-error" role="alert">
              {error}
            </p>
          )}

          <CheckoutForm
            defaultName={user?.displayName ?? ''}
            onPlaceOrder={handlePlaceOrder}
          />
        </>
      )}
    </section>
  )
}

export default CartPage
