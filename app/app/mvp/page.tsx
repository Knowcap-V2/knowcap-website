import { redirect } from 'next/navigation'

// /mvp is retired from the public site. The in-browser Knowapp demo exposed a
// developer API-key setup screen to visitors; until it's productized behind a
// gate it redirects home. (Audit 2026-06-14.)
export default function MVPPage() {
  redirect('/')
}
