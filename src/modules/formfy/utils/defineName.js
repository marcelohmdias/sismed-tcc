export default (...paths) => {
  const names = paths.filter((name) => name)
  return [].concat('formfy', ...names)
}
