import app from './../../package.json'

const appName = 'SISMed App'
const companyName = 'Sistema de Gestão Médica'
const version = app.version
const hasSw = (navigator.serviceWorker && navigator.serviceWorker.controller)
const mode = (window.matchMedia('(display-mode: standalone)').matches)
  ? 'standalone'
  : 'web'

const sw = hasSw
  ? 'sw-on'
  : 'sw-off'

export default () => {
  console.log(
    `%c ${appName}%c- ${companyName} %c v${version} %c ${mode}/${sw} %c`,
    'background:#2d527c; padding: 3px; border-radius: 5px 0 0 5px; color: #fff;   font-weight: bold',
    'background:#2d527c; padding: 3px; color: #fff',
    'background:#000; padding: 3px; border-radius: 0 0 0 0; color: #fff',
    `background:${hasSw ? '#1e824C' : '#c0392b'}; padding: 3px; border-radius: 0 5px 5px 0;  color: #fff`,
    'background:transparent'
  )
}
