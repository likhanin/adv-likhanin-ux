import { Text } from '../../../atoms/Text/Text'
import './PostpayDebtSummary.css'

export function PostpayDebtSummary({ title, usageLabel, dueLabel, progress = 0 }) {
  const normalizedProgress = Math.max(0, Math.min(progress, 100))

  return (
    <section className="postpay-debt-summary">
      <div className="postpay-debt-summary__body">
        <Text as="h3" variant="h7" className="postpay-debt-summary__title">
          {title}
        </Text>
        <Text as="p" variant="xs10" className="postpay-debt-summary__usage">
          {usageLabel}
        </Text>
        <div className="postpay-debt-summary__progress" aria-hidden="true">
          <span style={{ width: `${normalizedProgress}%` }} />
        </div>
        <Text as="p" variant="xs10" tone="soft" className="postpay-debt-summary__due">
          {dueLabel}
        </Text>
      </div>
    </section>
  )
}
