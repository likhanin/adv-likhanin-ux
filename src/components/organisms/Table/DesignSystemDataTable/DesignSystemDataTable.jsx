import { createElement, isValidElement, useEffect, useMemo, useRef, useState } from 'react'
import './DesignSystemDataTable.css'

function getColumnKey(column) {
  return column.key ?? column.id
}

function getPixelWidth(value) {
  if (typeof value === 'number') {
    return value
  }

  const match = String(value ?? '').trim().match(/^([0-9.]+)px$/)
  return match ? Number(match[1]) : 0
}

function getCellValue(row, column) {
  const key = getColumnKey(column)

  if (typeof column.render === 'function') {
    return column.render(row)
  }

  return row[key]
}

function getAlign(column) {
  return column.align === 'right' ? 'right' : 'left'
}

function TableCell({ as: Component = 'td', children, align = 'left', className = '', ...props }) {
  const hasCustomContent = isValidElement(children)
  const classes = ['design-table__cell', align === 'right' && 'design-table__cell--right', className]
    .filter(Boolean)
    .join(' ')
  const contentClasses = [
    'design-table__cell-content',
    hasCustomContent && 'design-table__cell-content--custom',
  ]
    .filter(Boolean)
    .join(' ')

  return createElement(
    Component,
    { className: classes, ...props },
    <span className={contentClasses}>{children}</span>,
  )
}

export function DesignSystemDataTable({
  columns = [],
  rows = [],
  className = '',
  getRowKey,
  size = 's',
  density = 'm',
  divider = true,
  stickyHeader = false,
  stickyFirstColumn = false,
  footer,
}) {
  const frameRef = useRef(null)
  const scrollRef = useRef(null)
  const bodyRef = useRef(null)
  const tableRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [bodyShadowMetrics, setBodyShadowMetrics] = useState({ top: 0, height: 0 })
  const tableMinWidth = useMemo(() => {
    const pixelWidth = columns.reduce((width, column) => width + getPixelWidth(column.width), 0)
    return pixelWidth > 0 ? pixelWidth : null
  }, [columns])
  const firstColumnWidth = useMemo(() => {
    if (!stickyFirstColumn) {
      return null
    }

    const width = columns[0]?.width

    if (typeof width === 'number') {
      return `${width}px`
    }

    return width || null
  }, [columns, stickyFirstColumn])
  const scrollClasses = ['design-table__scroll', className].filter(Boolean).join(' ')
  const classes = [
    'design-table',
    `design-table--size-${size}`,
    `design-table--density-${density}`,
    divider && 'design-table--divider',
    stickyHeader && 'design-table--sticky-header',
    stickyFirstColumn && 'design-table--sticky-first-column',
  ]
    .filter(Boolean)
    .join(' ')
  const frameClasses = [
    'design-table__frame',
    stickyFirstColumn && canScrollLeft && 'design-table__frame--first-column-shadow',
  ]
    .filter(Boolean)
    .join(' ')
  const shouldShowFixedColumnShadow = stickyFirstColumn && canScrollLeft
  const shouldShowRightEdgeShadow = canScrollRight
  const frameStyle = {
    ...(firstColumnWidth ? { '--design-table-sticky-column-width': firstColumnWidth } : {}),
    '--design-table-tbody-shadow-top': `${bodyShadowMetrics.top}px`,
    '--design-table-tbody-shadow-height': `${bodyShadowMetrics.height}px`,
  }
  const tableStyle = tableMinWidth ? { '--design-table-min-width': `${tableMinWidth}px` } : undefined

  useEffect(() => {
    const scrollNode = scrollRef.current

    if (!scrollNode) {
      return undefined
    }

    const updateScrollState = () => {
      const maxScrollLeft = scrollNode.scrollWidth - scrollNode.clientWidth
      const nextHasHorizontalScroll = maxScrollLeft > 1

      setCanScrollLeft(nextHasHorizontalScroll && scrollNode.scrollLeft > 1)
      setCanScrollRight(nextHasHorizontalScroll && scrollNode.scrollLeft < maxScrollLeft - 1)

      const frameRect = frameRef.current?.getBoundingClientRect()
      const bodyRect = bodyRef.current?.getBoundingClientRect()

      setBodyShadowMetrics({
        top: frameRect && bodyRect ? bodyRect.top - frameRect.top : 0,
        height: bodyRect?.height ?? 0,
      })
    }

    updateScrollState()
    scrollNode.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    const resizeObserver =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateScrollState)

    resizeObserver?.observe(scrollNode)
    if (tableRef.current) {
      resizeObserver?.observe(tableRef.current)
    }

    return () => {
      scrollNode.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
      resizeObserver?.disconnect()
    }
  }, [columns, rows, footer])

  return (
    <div ref={frameRef} className={frameClasses} style={frameStyle}>
      <div ref={scrollRef} className={scrollClasses}>
        <table ref={tableRef} className={classes} style={tableStyle}>
          {columns.some((column) => column.width) ? (
            <colgroup>
              {columns.map((column) => (
                <col key={getColumnKey(column)} style={column.width ? { width: column.width } : undefined} />
              ))}
            </colgroup>
          ) : null}
          <thead>
            <tr>
              {columns.map((column, index) => (
                <TableCell
                  key={getColumnKey(column)}
                  as="th"
                  align={getAlign(column)}
                  scope="col"
                  className={[
                    !index && 'design-table__cell--edge-start',
                    index === columns.length - 1 && 'design-table__cell--edge-end',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {column.label}
                </TableCell>
              ))}
            </tr>
          </thead>
          <tbody ref={bodyRef}>
            {rows.map((row, rowIndex) => {
              const rowKey = getRowKey?.(row, rowIndex) ?? row.id ?? `${rowIndex}`

              return (
                <tr key={rowKey}>
                  {columns.map((column, columnIndex) => (
                    <TableCell
                      key={`${rowKey}-${getColumnKey(column)}`}
                      align={getAlign(column)}
                      className={[
                        !columnIndex && 'design-table__cell--edge-start',
                        columnIndex === columns.length - 1 && 'design-table__cell--edge-end',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {getCellValue(row, column)}
                    </TableCell>
                  ))}
                </tr>
              )
            })}
          </tbody>
          {footer ? (
            <tfoot>
              <tr>
                <TableCell as="td" colSpan={columns.length}>
                  {footer}
                </TableCell>
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>
      {shouldShowFixedColumnShadow ? <span className="design-table__fixed-column-shadow" aria-hidden="true" /> : null}
      {shouldShowRightEdgeShadow ? <span className="design-table__tbody-edge-shadow" aria-hidden="true" /> : null}
    </div>
  )
}
