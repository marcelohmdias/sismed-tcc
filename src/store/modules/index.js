const requireModule = require.context('.', true, /index\.js$/)

const parsePath = (modules, fileName) => {
  if (fileName === './index.js') return modules

  const name = fileName.split('/')[1]

  return Object.assign(modules, {
    [name]: requireModule(fileName).default
  })
}

export default requireModule.keys().reduce(parsePath, {})
