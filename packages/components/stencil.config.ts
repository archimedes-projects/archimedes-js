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
      type: 'dist-custom-elements-bundle'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
}
