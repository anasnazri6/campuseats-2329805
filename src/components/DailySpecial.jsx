
import { useEffect, useState } from 'react'

function DailySpecial({ item }) {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    function updateCountdown() {
      const remaining = Math.max(
        0,
        new Date(item.specialEndsAt).getTime() - Date.now()
      )

      setTimeLeft(remaining)
    }

    updateCountdown()

    const timer = setInterval(updateCountdown, 1000)

    return () => clearInterval(timer)
  }, [item.specialEndsAt])

  if (timeLeft <= 0) {
    return <p className="muted">Special offer ended</p>
  }

  const totalSeconds = Math.floor(timeLeft / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return (
    <p className="tag">
      Daily Special · {hours}h {minutes}m {seconds}s left
    </p>
  )
}

export default DailySpecial
