import { readdir } from 'fs/promises';
import { join } from 'path'

async function *getFileList(path) {
  const files = await readdir(path, { withFileTypes: true });

  for await (const d of files) {
    if (d.isDirectory()) {
      yield *getFileList(join(path, d.name))
    }
    else {
      yield join(path, d.name)
    }
  }
}

export default getFileList