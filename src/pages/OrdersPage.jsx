
import { useMyOrders } from '../hooks/useMyOrders.js'
import OrderStatus from '../components/OrderStatus.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import OrderActions from '../components/OrderActions.jsx'

function OrdersPage() {
  const { orders, loading, error } = useMyOrders()

  // TODO: replaces useCart().orders with Firestore orders

  return (
    <section>
      <h2 className="section-title">My Orders</h2>

      {loading && <Loading />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && orders.length === 0 && (
        <p>No orders yet.</p>
      )}

      {!loading && !error && (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="card">

              <p className="cart-name">
                {order.vendorName} · pickup {order.pickupTime}
              </p>

              {/* Student details */}
              <p>Name: {order.studentName}</p>
              <p className="muted">
                Mahallah: {order.mahallah}
              </p>

              {/* Order items */}
              <p className="muted">
                {order.items.map((i) => `${i.qty}× ${i.name}`).join(', ')}
              </p>

              {/* Order date */}
              <p className="muted">
                Placed {order.createdAt
                  ? order.createdAt.toDate().toLocaleString('en-MY')
                  : 'just now'}
              </p>

              {/* Total */}
              <p className="price">
                RM {order.total.toFixed(2)}
              </p>

              {/* Live order status */}
              <OrderStatus status={order.status} />
              {order.status === 'Received' && (
            <OrderActions order={order} />
          )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default OrdersPage
