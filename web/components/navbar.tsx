import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavItemProps {
  href: string
  children: React.ReactNode
  className?: string
}

function NavItem({ href, children, className }: NavItemProps) {
  return (
    <Link 
      href={href}
      className={cn(
        "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
        className
      )}
    >
      {children}
    </Link>
  )
}

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold text-xl tracking-tight">
          HEARTLY
        </Link>
        <div className="flex gap-8">
          <NavItem href="/what">What</NavItem>
          <NavItem href="/why">Why</NavItem>
          <NavItem href="/how">How</NavItem>
        </div>
      </div>
    </nav>
  )
}

