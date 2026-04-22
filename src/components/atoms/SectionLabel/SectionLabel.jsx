import { Text } from '../Text/Text'
import './SectionLabel.css'

export function SectionLabel({ as = 'h2', children, className = '' }) {
  return (
    <Text as={as} tone="soft" variant="s10" className={`section-label ${className}`.trim()}>
      {children}
    </Text>
  )
}
