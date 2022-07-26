
import railsPlugin from 'esbuild-rails'
import { sassPlugin } from 'esbuild-sass-plugin'
import * as esbuild from 'esbuild'
import * as path from 'path'

const entryPoints = ['application.js']

esbuild.build({
  absWorkingDir: path.join(process.cwd(), 'app/javascript'),
  bundle: true,
  entryPoints,
  outdir: path.join(process.cwd(), 'app/assets/builds'),
  plugins: [sassPlugin(), railsPlugin()],
  sourcemap: process.env.RAILS_ENV !== 'production',
  minify: process.env.RAILS_ENV === 'production' && 'external',
  watch: process.argv.includes('--watch')
}).catch(() => process.exit(1))
