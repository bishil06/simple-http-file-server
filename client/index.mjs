import { request } from 'http'
import { createGzip } from 'zlib'
import { createReadStream, lstatSync } from 'fs'
import { basename } from 'path'

import getFileList from './getFileList.mjs'

const filename = process.argv[2]
const serverHost = process.argv[3]

function sendFile(fileName, httpOptions) {
  const req = request(httpOptions, (res) => {
    console.log(`Server response: ${res.statusCode}`)
  })

  return new Promise((resolve, reject) => {
    createReadStream(fileName)
      .pipe(createGzip())
      .pipe(req)
      .on('finish', () => {
        console.log(`${fileName} File successfully sent`)
        resolve()
      })
      .on('error', err => {
        reject(err)
      })
  })
}

if (lstatSync(filename).isDirectory()) {
  for await (const p of getFileList(filename)) {
    const httpRequestOptions = {
      hostname: serverHost,
      port: 8080,
      path: '/',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Encoding': 'gzip',
        'X-Filename': basename(p)
      }
    }

    await sendFile(p, httpRequestOptions)
  }
}
else {
  const httpRequestOptions = {
    hostname: serverHost,
    port: 8080,
    path: '/',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Encoding': 'gzip',
      'X-Filename': basename(filename)
    }
  }

  await sendFile(filename, httpRequestOptions)
}


