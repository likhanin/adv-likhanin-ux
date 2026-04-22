import { Button } from '../../../atoms/Button/Button'
import { Checkbox } from '../../../atoms/Checkbox/Checkbox'
import './AdsToolbar.css'

export function AdsToolbar({ checkboxLabel, sortLabel }) {
  return (
    <div className="ads-toolbar">
      <Checkbox label={checkboxLabel} />
      <Button className="toolbar-filter" variant="toolbar" size="m" preset="default" priority="secondary" type="button">
        {sortLabel}
      </Button>
    </div>
  )
}
