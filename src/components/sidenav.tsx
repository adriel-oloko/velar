'use client'

import { SideNavProps, SideNavEntryProps } from '@/types'
import { WalletIcon, ChevronsUpDownIcon, CircleGaugeIcon, ArrowUpDownIcon, ChartAreaIcon, ChevronDownIcon, BinocularsIcon, CoinsIcon, BriefcaseIcon, GiftIcon, Gamepad2Icon, NotepadTextIcon, XIcon, DropletIcon, GoalIcon, ClockIcon, HandCoinsIcon, TrophyIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function SideNav({ isMenu, func }: SideNavProps) {
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const checkViewport = () => setIsDesktop(window.innerWidth >= 768)
        checkViewport()
        window.addEventListener('resize', checkViewport)
        return () => window.removeEventListener('resize', checkViewport)
    }, [])

    const variants = {
        hidden: { opacity: 0, y: '100%' },
        visible: { opacity: 1, y: 0 },
    }
    return (
        <AnimatePresence>
            {(isMenu || isDesktop) && (
                <motion.div id="_sidenav" key="sidenav" className={`fixed bottom-0 top-0 bg-foreground dark:bg-background md:bg-transparent w-full rounded-t-2xl overflow-y-auto z-50 md:relative md:inset-y-auto md:block md:w-1/5 p-4 md:pr-0 md:p-6`} initial={window.innerWidth < 768 ? 'hidden' : false} animate={window.innerWidth < 768 ? 'visible' : false} exit={window.innerWidth < 768 ? 'hidden' : ''} variants={variants} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                    <div className="flex justify-between pr-1 md:pr-0 mt-1">
                        <Image src={'/logo-white.svg'} className="w-40" width={1589} height={436} alt="" />
                        <button onClick={func} className="md:hidden text-background dark:text-foreground">
                            <XIcon />
                        </button>
                    </div>
                    <div className="bg-black p-2 rounded-lg flex justify-between items-center mt-4 w-full">
                        <div className="flex gap-2 items-center">
                            <WalletIcon fill="#000" size={32} className="p-1.5 bg-gray-900 rounded" />
                            <div className="flex flex-col gap-1 text-xs font-medium">
                                <p className="truncate text-gray-600">Your Address</p>
                                <p className="font-semibold">0x79...9268</p>
                            </div>
                        </div>

                        <ChevronsUpDownIcon strokeWidth={2} size={20} />
                    </div>

                    <button className="bg-black p-2 rounded-lg flex gap-2 items-center mt-4 w-fit pr-3">
                        <WalletIcon fill="#000" size={32} className="p-1.5 bg-gray-900 rounded" />
                        Connect wallet
                    </button>

                    <div className="mt-4">
                        <h2 className="capitalize text-gray-600 font-medium text-lg">main Menu</h2>

                        <SideNavEntry icon={<CircleGaugeIcon size={20} strokeWidth={1.5} />} label="dashboard" isActive={true} hasExpand={false} />
                        <SideNavEntry icon={<BriefcaseIcon size={20} strokeWidth={1.5} />} label="portfolio" isActive={false} hasExpand={false} />
                        <SideNavEntry
                            icon={<ChartAreaIcon size={20} strokeWidth={1.5} />}
                            label="trade"
                            isActive={false}
                            hasExpand={true}
                            subEntries={[
                                [<GoalIcon key={2} size={20} strokeWidth={1.5} />, 'Limit Orders'],
                                [<DropletIcon key={2} size={20} strokeWidth={1.5} />, 'Liquidity'],
                            ]}
                        />
                        <SideNavEntry icon={<BinocularsIcon size={20} strokeWidth={1.5} />} label="watchlist" isActive={false} hasExpand={false} />
                        <SideNavEntry icon={<ArrowUpDownIcon size={20} strokeWidth={1.5} />} label="swap" isActive={false} hasExpand={false} />
                        <SideNavEntry icon={<CoinsIcon size={20} strokeWidth={1.5} />} label="staking" isActive={false} hasExpand={false} />
                    </div>
                    <div className="mt-4">
                        <h2 className="capitalize text-gray-600 font-medium text-lg">Campaign</h2>

                        <SideNavEntry icon={<NotepadTextIcon size={20} strokeWidth={1.5} />} label="learn and earn" isActive={false} hasExpand={false} />
                        <SideNavEntry icon={<Gamepad2Icon size={20} strokeWidth={1.5} />} label="arcade" isActive={false} hasExpand={false} />
                        <SideNavEntry
                            icon={<GiftIcon size={20} strokeWidth={1.5} />}
                            label="rewards"
                            isActive={false}
                            hasExpand={true}
                            subEntries={[
                                [<TrophyIcon key={2} size={20} strokeWidth={1.5} />, 'Overview'],
                                [<HandCoinsIcon key={2} size={20} strokeWidth={1.5} />, 'Claims'],
                                [<ClockIcon key={2} size={20} strokeWidth={1.5} />, 'History'],
                            ]}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export function SideNavEntry({ icon, label, isActive, hasExpand, subEntries }: SideNavEntryProps) {
    const [isExpand, setIsExpand] = useState<boolean>(false)

    return (
        <div className={`${isActive && !hasExpand && 'bg-custom-white dark:bg-custom-black rounded-l-none border-l-[2.5px] border-solid border-background dark:border-gray-200'} p-2.5 py-3 rounded-md text-custom-black dark:text-white`}>
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center font-medium">
                    {icon}
                    <span className="capitalize">{label}</span>
                </div>
                {hasExpand && (
                    <button onClick={() => setIsExpand((prev) => !prev)}>
                        <ChevronDownIcon strokeWidth={1.5} size={20} className={`${isExpand && 'rotate-180'} transition-all`} />
                    </button>
                )}
            </div>

            <AnimatePresence>
                {hasExpand && isExpand && subEntries && (
                    <motion.div initial={{ opacity: 0, translateX: 12 }} animate={{ opacity: 1, translateX: 0 }} className="px-6 flex flex-col gap-4 mt-4 ease-snappy">
                        {subEntries.map((entry, key) => {
                            return (
                                <div key={key} className="flex gap-2 items-center font-medium">
                                    {entry[0]}
                                    <span className="capitalize">{entry[1]}</span>
                                </div>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
