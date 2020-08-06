import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/">
      <a>
        <img src="/img/logo.svg" alt="website logo" width="48" height="48" />
      </a>
    </Link>
  )
}
