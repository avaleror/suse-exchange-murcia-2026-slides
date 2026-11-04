// Official SUSE assets by name, e.g. "geeko/sitting-confident", "products/edge/pos-green-horizontal".
const files = import.meta.glob('../assets/{logos,geeko,products,icons,illustrations}/**/*.svg', {
  eager: true,
  import: 'default',
})

export function assetUrl(ref) {
  if (!ref) return undefined
  if (/^(https?:|\/|data:)/.test(ref)) return ref // deck's own public/ file or URL
  const hit = files[`../assets/${ref.replace(/\.svg$/, '')}.svg`]
  if (!hit) console.warn(`[suse] unknown asset "${ref}"`)
  return hit
}
