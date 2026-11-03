
import { useCart } from '../hooks/useCart'

function OrdersPage() {
  const { orders } = useCart()

  return (
    <section>
      <h2 className="section-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="muted">No orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="card" key={order.id}>

              <div className="order-header">
                <h3>Order #{order.id}</h3>

                <div className="customer-info">
                  <p><strong>{order.name}</strong></p>
                  <p>{order.mahallah}</p>
                </div>
              </div>

              <hr />

              <p><strong>Order Details:</strong></p>

              {order.items.map((line) => (
                <p key={line.item.id}>
                  {line.item.name} × {line.qty}
                </p>
              ))}

              <p>Total: RM {order.total.toFixed(2)}</p>

              <p>
                Date: {new Date(order.date).toLocaleString()}
              </p>

            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default OrdersPage
