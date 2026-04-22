import { Button } from '../../../atoms/Button/Button'
import { Text } from '../../../atoms/Text/Text'
import './WalletSummary.css'

export function WalletSummary({ label, amount, note, action }) {
  return (
    <div className="wallet-summary">
      <div>
        <Text as="span" variant="xs10" className="wallet-summary__label">
          {label}
        </Text>
        <Text as="strong" variant="h5" className="wallet-summary__amount">
          {amount}
        </Text>
        <Text as="span" variant="xs10" className="wallet-summary__note">
          {note}
        </Text>
      </div>
      <Button type="button" size="m" preset="overlay" priority="primary">
        {action}
      </Button>
    </div>
  )
}
