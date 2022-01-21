import { Config } from '@stencil/core'

export const config: Config = {
  namespace: 'archimedes',
  globalStyle: 'src/theme.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
}
