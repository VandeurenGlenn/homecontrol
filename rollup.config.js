import nodeResolve from '@rollup/plugin-node-resolve';
import { readdir, unlink } from 'fs/promises';
import { join } from 'path';

const paths = await readdir('public')
for (const path of paths) {
  if (!path.includes('.html') && path !== 'service-worker.js' && path !== 'manifest.json' && path !== 'images') {
    await unlink(join('public', path))
  }
}

export default [{
  input: ['src/client.js', 'src/update-controller.js'],
  output: {
    dir: 'public',
    format: 'es'
  },
  plugins: [
    nodeResolve()   
  ]
}]
