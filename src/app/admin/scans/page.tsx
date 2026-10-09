import type { Metadata } from 'next'
import { ScansDashboard } from '@/components/admin/scans-dashboard'

export const metadata: Metadata = {
  title: 'Card Scans',
  robots: { index: false, follow: false },
}

export default function ScansPage() {
  return <ScansDashboard />
}
