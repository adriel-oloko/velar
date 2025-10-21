import { BellIcon, LayoutDashboardIcon, MoonIcon, SearchIcon, SunIcon } from 'lucide-react'
import Image from 'next/image'
import { CommandF, SearchBar } from './single-components'
import { HeaderProps } from '@/types'

import { useThemeStore } from '@/store/store'

export function Header({ func }: HeaderProps) {
    const theme = useThemeStore((state) => state.theme)
    const toggleTheme = useThemeStore((state) => state.toggleTheme)

    return (
        <header className="">
            <nav className="flex flex-col">
                <div className="flex justify-between items-center md:hidden">
                    <Image src={'/logo-white.svg'} className="w-40" width={1589} height={436} alt="" />
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
                            {theme == 'dark' ? <SunIcon strokeWidth={1.5} className='md:size-5' /> : <MoonIcon strokeWidth={1.5} className='md:size-5' />}
                        </button>
                        <button title="Open menu" type="button" className="">
                            <BellIcon className="md:size-5" />
                        </button>
                        <div className="size-6 rounded-full bg-white" />
                    </div>
                </div>
            </nav>
        </header>
    )
}
