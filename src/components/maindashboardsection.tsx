import { ChevronUp, CoinsIcon, PlusIcon } from 'lucide-react'
import TradingViewWidget from './trading-view-widget'
import { EllipseButton, Footer } from './single-components'
import { Staking } from './staking'
import { useState, useRef, useEffect } from 'react'

import { useAccount, useBalance } from 'wagmi'

export function MainDashboardSection() {
    const [visibleIndex, setVisibleIndex] = useState<number>(0)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    const featured_work_ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number((entry.target as HTMLElement).dataset.index)
                        setVisibleIndex(index)
                    }
                })
            },
            {
                root: featured_work_ref.current,
                threshold: 0.6, // 60% visible
            }
        )

        cardsRef.current.forEach((el) => {
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const { isConnected, address } = useAccount()
    const { data: balance } = useBalance({
        address: address,
    })

    useEffect(() => {
        console.log(balance)
    }, [balance])

    return (
        <div className="w-full flex flex-col gap-4 md:gap-6 h-full xl:max-w-3/4">
            <div ref={featured_work_ref} className="snap-x snap-mandatory flex gap-x-4 overflow-x-scroll md:gap-x-6 md:overflow-hidden">
                <div
                    ref={(el) => {
                        cardsRef.current[0] = el
                    }}
                    data-index="0"
                    className="min-w-full snap-center snap-always bg-[#f2f2f2] dark:bg-custom-black shadow dark:shadow-black/40 p-4 rounded-lg flex flex-col justify-between md:min-w-2/5 md:flex-1 text-background dark:text-foreground">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <div className="bg-gray-50 p-1 w-fit rounded-full">
                                <CoinsIcon strokeWidth={1.75} size={20} className="text-black" />
                            </div>
                            <p className="capitalize font-medium text-xl">Account balance</p>
                        </div>

                        <EllipseButton />
                    </div>

                    <div className="grid md:grid-cols-1 gap-4 mt-4 w-full">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-4xl font-semibold font-manrope">
                                {balance ? (
                                    <>{(Number(balance.value)/(10**18)).toFixed(5)} {balance.symbol}</>
                                ) : (
                                    <>
                                        $0<span className="text-gray-400/50">.**</span>
                                    </>
                                )}
                            </h3>
                            <div className="">
                                <div className="bg-green-500 shadow-green-400/50 dark:bg-green-500/40 shadow text-green-100 flex items-center gap-2 px-1 py-0.5 w-fit pr-2 text-xs rounded-full">
                                    <ChevronUp strokeWidth={2} size={18} className="" />
                                    28.37%
                                </div>
                            </div>
                        </div>

                        <div className="hidden"></div>
                    </div>
                </div>

                <div
                    ref={(el) => {
                        cardsRef.current[1] = el
                    }}
                    data-index="1"
                    className="min-w-full snap-center snap-always bg-[#f2f2f2] dark:bg-custom-black p-4 h-full rounded-lg md:min-w-fit text-background dark:text-foreground">
                    <div className="flex justify-between items-center gap-x-8">
                        <div className="flex gap-2 items-center">
                            <div className="bg-gray-50 p-1 w-fit rounded-full">
                                <CoinsIcon strokeWidth={1.75} size={20} className="text-black" />
                            </div>
                            <p className="capitalize font-medium text-xl">Profit and Losses</p>
                        </div>

                        <EllipseButton />
                    </div>

                    <div className="grid grid-cols-2">
                        <div className="mt-4">
                            <p className="text-gray-400/50 font-medium text-sm">Today&apos;s PnL</p>
                            <p className="text-3xl font-medium font-montserrat">$0,000.00</p>
                            <div className="mt-2">
                                <div className="flex gap-2">
                                    <div className="bg-green-500/40 shadow-green-400/50 shadow text-green-100 flex items-center gap-2 px-1 py-0.5 w-fit pr-2 text-xs rounded-full">
                                        <ChevronUp strokeWidth={2} size={18} className="" />
                                        28.37%
                                    </div>
                                    <div className="text-green-500 flex items-center px-1 py-0.5 w-fit pr-2 text-xs rounded-full">
                                        <PlusIcon strokeWidth={2} size={12} className="" />
                                        28,400.39
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 w-fit mx-auto lg:hidden -mt-2 mb-4">
                <span className={`size-2 ${visibleIndex == 0 ? 'bg-black dark:bg-white' : 'border-2 border-solid'} rounded`} />
                <span className={`size-2 ${visibleIndex == 1 ? 'bg-black dark:bg-white' : 'border-2 border-solid'} rounded`} />
            </div>

            <TradingViewWidget />
            <Staking />

            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    )
}
