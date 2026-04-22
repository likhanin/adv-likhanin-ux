import './Logo.css'

export function Logo({
  href = '/',
  src = 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Avito_logo.svg',
  width = 109,
  height = 32,
  alt = 'Avito',
}) {
  return (
    <a className="logo" href={href} aria-label={alt}>
      <img src={src} width={width} height={height} alt={alt} />
    </a>
  )
}
