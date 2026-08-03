/**
 * Carries paid-ad attribution (utm_*, gclid, fbclid) from a marketing-site query
 * string into an app.knowcap.ai link, so a campaign tag survives the click into
 * signup (EPIC 24 / #7670's own success criterion).
 *
 * The app itself does not yet persist these params into the account record —
 * that would be a knowcap-app (server) change, and #7670 explicitly excludes
 * "any change to what signup does" from this slice. This utility only keeps the
 * tag alive in the URL through the hop from this site to app.knowcap.ai; a
 * malformed or truncated value is carried as-is (URLSearchParams never throws
 * on an odd string), so a broken tag degrades attribution without breaking the
 * page or the link.
 */

type SearchParams = { [key: string]: string | string[] | undefined } | undefined

const CARRIED_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid']

export function withCampaignParams(baseUrl: string, searchParams: SearchParams, fallbackUtmSource: string): string {
  const url = new URL(baseUrl)
  let carried = false
  if (searchParams) {
    for (const key of CARRIED_KEYS) {
      const raw = searchParams[key]
      const value = Array.isArray(raw) ? raw[0] : raw
      if (value) {
        url.searchParams.set(key, value)
        carried = true
      }
    }
  }
  if (!carried) url.searchParams.set('utm_source', fallbackUtmSource)
  return url.toString()
}

/** Same param-carrying logic, returned as an internal relative href (e.g. for
 * <Link href="/book">) instead of a full URL — avoids round-tripping through a
 * fake absolute URL just to strip the origin back off. */
export function withCampaignParamsRelative(path: string, searchParams: SearchParams, fallbackUtmSource: string): string {
  const full = withCampaignParams(`https://knowcap.ai${path}`, searchParams, fallbackUtmSource)
  return full.replace('https://knowcap.ai', '')
}
