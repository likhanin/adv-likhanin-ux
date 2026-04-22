import './AppDataTable.css'

export function AppDataTable({ columns = [], rows = [], className = '', getRowKey }) {
  const classes = ['app-data-table', className].filter(Boolean).join(' ')

  return (
    <table className={classes}>
      {columns.some((column) => column.width) ? (
        <colgroup>
          {columns.map((column) => (
            <col key={column.key} style={column.width ? { width: column.width } : undefined} />
          ))}
        </colgroup>
      ) : null}
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={getRowKey?.(row, index) ?? row.id ?? `${index}`}>
            {columns.map((column) => (
              <td key={`${getRowKey?.(row, index) ?? row.id ?? index}-${column.key}`}>
                {row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
