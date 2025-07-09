import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Abhishek Sharma - Portfolio',
  description: 'Computer Science Student & Developer | AI/ML, Full-Stack Development, Systems Programming',
  generator: 'Next.js',
  keywords: ['Abhishek Sharma', 'Portfolio', 'Developer', 'Computer Science', 'AI/ML', 'Full-Stack'],
  authors: [{ name: 'Abhishek Sharma' }],
  creator: 'Abhishek Sharma',
  openGraph: {
    title: 'Abhishek Sharma - Portfolio',
    description: 'Computer Science Student & Developer | AI/ML, Full-Stack Development, Systems Programming',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
