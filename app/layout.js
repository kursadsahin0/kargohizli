import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'KargoHızlı - Online Kargo Gönderim Platformu',
  description: 'Şubeye gitmeden online kargo gönderimi yapın. Hızlı, güvenli ve kolay.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}