import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from './store'

Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('./locals', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

export default new VueI18n({
  locale: store.state.appLanguage,
  // locale: process.env.VUE_APP_I18N_LOCALE || 'es',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'es',
  messages: loadLocaleMessages(),
})
