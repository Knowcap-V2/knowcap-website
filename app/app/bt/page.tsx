import VersionBThemed from '@/components/version-bt'

// /bt — proof route: impeccable craft + Knowcap's 4-theme system (B copy).
// No route-scoped fonts: this variant uses the theme tokens' own font stacks
// (Space Grotesk / Inter / JetBrains Mono / EB Garamond), loaded via the
// component's style block + globals.
export default function VersionBThemedPage() {
  return <VersionBThemed />
}
