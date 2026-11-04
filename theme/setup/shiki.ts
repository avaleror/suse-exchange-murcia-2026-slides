import { defineShikiSetup } from '@slidev/types'

// Code highlighting in brand colours only (no red): pine panel, palette tokens.
const suse = {
  name: 'suse',
  type: 'dark',
  colors: { 'editor.background': '#0C322C', 'editor.foreground': '#EFEFEF' },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#90EBCD', fontStyle: 'italic' } },
    { scope: ['keyword', 'storage', 'storage.type', 'keyword.control'], settings: { foreground: '#30BA78' } },
    { scope: ['string', 'string.quoted', 'markup.inline.raw'], settings: { foreground: '#90EBCD' } },
    { scope: ['constant.numeric', 'constant.language', 'constant.character'], settings: { foreground: '#FE7C3F' } },
    { scope: ['entity.name.function', 'support.function', 'entity.name.tag'], settings: { foreground: '#FFFFFF' } },
    { scope: ['entity.name.type', 'support.type', 'entity.other.attribute-name'], settings: { foreground: '#30BA78' } },
    { scope: ['variable', 'meta.object-literal.key', 'support.type.property-name'], settings: { foreground: '#EFEFEF' } },
    { scope: ['invalid'], settings: { foreground: '#FE7C3F' } },
  ],
}

export default defineShikiSetup(() => ({
  themes: { dark: suse, light: suse },
}))
