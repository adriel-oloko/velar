import '@/styles/globals.css'
import { Inter, Manrope, Open_Sans, Rubik, Outfit, Montserrat, Amiri } from 'next/font/google'
import { useThemeStore } from '@/store/store'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })
const openSans = Open_Sans({
    variable: '--font-open-sans',
    subsets: ['latin'],
})
const manRope = Manrope({
    variable: '--font-manrope',
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
})

const rubik = Rubik({ variable: '--font-rubik', subsets: ['latin'] })
const outfit = Outfit({ variable: '--font-outfit', subsets: ['latin'] })
const montserrat = Montserrat({
    variable: '--font-montserrat',
    subsets: ['latin'],
})
const amiri = Amiri({
    variable: '--font-amiri',
    subsets: ['latin'],
    weight: ['400', '700'],
})

export default function App({ Component, pageProps }: AppProps) {
    const theme = useThemeStore((state) => state.theme)

    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <>
            <Head>
                <title>Velar - Dashboard</title>
            </Head>
            <main className={`font-manrope bg-white dark:bg-background ${inter.variable} ${openSans.variable} ${manRope.variable} ${rubik.variable} ${outfit.variable} ${montserrat.variable} ${amiri.variable}`}>
                <Component {...pageProps} />
            </main>
        </>
    )
}
