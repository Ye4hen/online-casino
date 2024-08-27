import { createI18n } from 'vue-i18n'

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
const i18n = createI18n({
	legacy: false,
	locale: '',
	messages: {},
})

// Create a context for all .yml files in the locales directory
const context = import.meta.webpackContext('../../locales', {
	recursive: true,
	regExp: /\.json$/,
})

const localesMap = Object.fromEntries(
	context.keys().map((key) => {
		const locale = key.match(/([\w-]*)\.yml$/)?.[1]
		return [locale, () => context(key)]
	})
)

console.log('localesMap')
console.log(localesMap)

export const availableLocales = Object.keys(localesMap)

const loadedLanguages = []

function setI18nLanguage(lang) {
	i18n.global.locale.value = lang
	if (typeof document !== 'undefined')
		document.querySelector('html')?.setAttribute('lang', lang)
	return lang
}

export async function loadLanguageAsync(lang) {
	// If the same language
	if (i18n.global.locale.value === lang)
		return setI18nLanguage(lang)

	// If the language was already loaded
	if (loadedLanguages.includes(lang))
		return setI18nLanguage(lang)

	// If the language hasn't been loaded yet
	const messages = await localesMap[lang]()
	i18n.global.setLocaleMessage(lang, messages.default)
	loadedLanguages.push(lang)
	return setI18nLanguage(lang)
}

export const install = ({ app }) => {
	app.use(i18n)
	loadLanguageAsync('en')
}
