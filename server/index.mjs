import { createServer } from 'http'
import { createWriteStream, mkdirSync } from 'fs'
import { createGunzip } from 'zlib'
import { basename, join } from 'path'

import createSecondName from './createSecondName.mjs'

mkdirSync('received_files')

const fileNames = new Set()

const server = createServer((req, res) => {
  console.log(fileNames)
  let fileName = basename(req.headers['x-filename'])

  while (true) {
    if (fileNames.has(fileName)) {
      fileName = createSecondName(fileName)
    }
    else {
      fileNames.add(fileName)
      break
    }
  }

  const destFilename = join('received_files', fileName)
  console.log(`File request received: ${fileName}`)

  req
    .pipe(createGunzip())
    .pipe(createWriteStream(destFilename))
    .on('finish', () => {
      res.writeHead(201, { 'Content-Type': 'text/plain' })
      res.end('OK\n')
      console.log(`File saved: ${destFilename}`)
    })
})

server.listen(8080, () => console.log('Listening on http://localhost:8080'))