import { basename, extname } from 'path'

function createSecondName(fileName) {
  const originBaseExtName = extname(fileName)
  const originBaseName = basename(fileName, originBaseExtName)
  return `${originBaseName}2${originBaseExtName}`
}

export default createSecondName