//@ts-check
process.env.NEXT_ROOT = __dirname

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next')
const withNextra = require('nextra')

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'zh'
  }
}

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  withNextra({
    theme: 'nextra-theme-docs',
    themeConfig: './apps/docs/theme.config.tsx',
    rootDir: __dirname,
  }),
]

module.exports = composePlugins(...plugins)(nextConfig)
