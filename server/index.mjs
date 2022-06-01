import { createServer } from 'http'
import { createWriteStream, mkdirSync } from 'fs'
import { createGunzip } from 'zlib'
import { basename, join } from 'path'

mkdirSync('received_files')

const server = createServer((req, res) => {
  const filename = basename(req.headers['x-filename'])
  const destFilename = join('received_files', filename)
  console.log(`File request received: ${filename}`)

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