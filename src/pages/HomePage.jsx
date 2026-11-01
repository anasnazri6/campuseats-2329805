
import VendorCard from '../components/VendorCard.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import { useVendors } from '../hooks/useVendors'
import { Link } from 'react-router'
import DailySpecial from '../components/DailySpecial.jsx'

function HomePage() {
  const { vendors, loading, error, reload } = useVendors()

  if (loading) return <Loading />

  if (error) {
    return <ErrorMessage message={error} onRetry={reload} />
  }

  // Get all daily special items from every vendor
  const specials = vendors.flatMap((vendor) =>
    vendor.menu
      .filter((item) => item.dailySpecial)
      .map((item) => ({
        ...item,
        vendorId: vendor.id,
        vendorName: vendor.name,
      }))
  )

  return (
    <section>
      {specials.length > 0 && (
  <section>
    <h2 className="section-title">
      🔥 Today's Daily Specials
    </h2>

    <div className="grid">
      {specials.map((item) => (
        <Link
          key={item.id}
          to={`/vendor/${item.vendorId}`}
          className="card"
        >
          <p className="tag">DAILY SPECIAL</p>

          <h3>{item.name}</h3>

          <p className="muted">
            {item.vendorName}
          </p>

          <p className="price">
            RM {item.price.toFixed(2)}
          </p>

          <DailySpecial item={item} />

          <p className="muted">
            View vendor menu →
          </p>
        </Link>
      ))}
    </div>
  </section>
)}

      <h2 className="section-title">Choose a vendor</h2>

      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
          />
        ))}
      </div>
    </section>
  )
}

export default HomePage
