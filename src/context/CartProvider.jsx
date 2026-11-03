import { useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { CartContext } from './cart-context'

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  const count = cart.reduce(
    (total, line) => total + line.qty,
    0
  )

  const total = cart.reduce(
    (total, line) => total + line.item.price * line.qty,
    0
  )

  function addToCart(item) {
    setCart(prevCart => {
      const existing = prevCart.find(
        line => line.item.id === item.id
      )

      if (existing) {
        return prevCart.map(line =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      return [...prevCart, { item, qty: 1 }]
    })
  }

  function changeQty(itemId, delta) {
    setCart(prevCart =>
      prevCart
        .map(line =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + delta }
            : line
        )
        .filter(line => line.qty > 0)
    )
  }

  function removeFromCart(itemId) {
    setCart(prevCart =>
      prevCart.filter(line => line.item.id !== itemId)
    )
  }

  function placeOrder(details = {}) {
    const order = {
      id: Date.now(),
      ...details,
      items: cart,
      total,
      date: new Date().toISOString(),
    }

    setOrders(prevOrders => [order, ...prevOrders])
    setCart([])

    return order
  }

  const value = useMemo(() => ({
    cart,
    orders,
    count,
    total,
    addToCart,
    changeQty,
    removeFromCart,
    placeOrder,
  }), [cart, orders, count, total])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}