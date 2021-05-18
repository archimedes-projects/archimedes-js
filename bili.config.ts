import { Config } from 'bili'

const config: Config = {
  input: 'src/index.ts',
  output: {
    format: ['cjs', 'esm'],
    dir: './lib'
  },
  plugins: {
    typescript2: {
      tsconfigOverride: {
        include: ['src']
      }
    }
  }
}

export default config
