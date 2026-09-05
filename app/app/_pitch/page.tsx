'use client'

import EditorialShell from '@/components/editorial/shell'

export default function PitchPage() {
  return (
    <EditorialShell>
      <div style={{ height: 'calc(100vh - 64px)' }}>
        <iframe
          src="/pitch-deck.html"
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Knowcap Pitch Deck"
        />
      </div>
    </EditorialShell>
  )
}
