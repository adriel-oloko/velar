import { BellIcon, LayoutDashboardIcon, MoonIcon, SearchIcon, SunIcon } from 'lucide-react'
import Image from 'next/image'
import { CommandF, SearchBar } from './single-components'
import { HeaderProps } from '@/types'

import { useThemeStore } from '@/store/store'
import { createAvatar } from '@dicebear/core'
import { identicon } from '@dicebear/collection'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export function Header({ func }: HeaderProps) {
    const account = useAccount()

    const theme = useThemeStore((state) => state.theme)
    const toggleTheme = useThemeStore((state) => state.toggleTheme)
    const [profile, setProfile] = useState<string>('')

    useEffect(() => {
        const avatar = createAvatar(identicon, {
            seed: account.address,
        })

        setProfile(avatar.toString())
    }, [account.address])

    return (
        <header className="">
            <nav className="flex flex-col">
                <div className="flex justify-between items-center md:hidden">
                    {theme == 'dark' ? <Image src={'/logo-white.svg'} className="w-40 md:w-full" width={2144} height={338} alt="" /> : <Image src={'/logo-black.svg'} className="w-40 md:w-full" width={2144} height={338} alt="" />}
                    <div className="flex gap-4 text-background dark:text-foreground">
                        <button
                            onClick={() => {
                                theme === 'light' ? toggleTheme('dark') : toggleTheme('light')
                            }}
                            title="Open menu"
                            type="button"
                            className="">
                            {theme == 'dark' ? <SunIcon strokeWidth={1.5} /> : <MoonIcon strokeWidth={1.5} />}
                        </button>
                        <button title="Open menu" type="button" className="">
                            <BellIcon strokeWidth={1.5} />
                        </button>
                        <button onClick={func} title="Open menu" type="button" className="">
                            <LayoutDashboardIcon strokeWidth={1.5} size={24} />
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4 md:mt-0">
                    <div className="flex flex-col">
                        <p className="text-background dark:text-foreground text-lg font-semibold md:font-semibold">Dashboard</p>
                        <p className="text-gray-600 font-medium dark:font-normal dark:text-gray-500 -mt-1">Hey Adriel, Welcome back!</p>
                    </div>

                    <div className="hidden gap-6 md:flex items-center text-background dark:text-foreground">
                        <SearchBar />
                        <button
                            onClick={() => {
                                theme === 'light' ? toggleTheme('dark') : toggleTheme('light')
                            }}
                            title="Open menu"
                            type="button"
                            className="">
                            {theme == 'dark' ? <SunIcon strokeWidth={1.5} className="md:size-5" /> : <MoonIcon strokeWidth={1.5} className="md:size-5" />}
                        </button>
                        <button title="Open menu" type="button" className="">
                            <BellIcon className="md:size-5" />
                        </button>
                        <div className="_r5t6wr size-6 rounded-full bg-gray-100 p-0.5" dangerouslySetInnerHTML={{ __html: profile }}></div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
