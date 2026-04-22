import './PostpayDebtSummary.css'

export function PostpayDebtSummary({ title, description }) {
  return (
    <section className="postpay-debt-summary">
      <div className="postpay-debt-summary__body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </section>
  )
}
