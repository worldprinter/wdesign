import { useConfig } from 'nextra-theme-docs'

export default {
    logo: <span>WDesign</span>,
    banner: {
        key: 'GlobalDescription',
        text: 'Beta 0.1.0 version released!',
    },
    project: {
        link: 'https://github.com/worldprinter/wdesign',
    },
    docsRepositoryBase: 'https://github.com/worldprinter/wdesign/blob/',
    editLink: {
        text: 'Edit this page on GitHub',
    },
    faviconGlyph: '✦',
    useNextSeoProps() {
        const { frontMatter } = useConfig()
        return {
            additionalLinkTags: [
                {
                    href: '/apple-touch-icon.png',
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                },
                {
                    href: '/favicon-32x32.png',
                    rel: 'icon',
                    sizes: '32x32',
                },
                {
                    href: '/favicon-16x16.png',
                    rel: 'icon',
                    sizes: '16x16',
                },
            ],
            additionalMetaTags: [
                { content: 'en', httpEquiv: 'Content-Language' },
                { content: 'WDesign', name: 'apple-mobile-web-app-title' },
                { content: '#333333', name: 'msapplication-TileColor' },
                { content: '/mstile-144x144.png', name: 'msapplication-TileImage' },
            ],
            description: frontMatter.description || 'WDesign: A React UI Library',
            openGraph: {
                images: [{ url: frontMatter.image || '' }],
            },
            titleTemplate: '%s – WDesign',
            twitter: {
                cardType: 'summary_large_image',
                site: 'https://wdesign.vercel.app',
            },
        }
    },
}
