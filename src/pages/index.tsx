import { Header } from '@/components/header'
import { GiftIcon, XIcon } from 'lucide-react'
import { SideNav } from '@/components/sidenav'
import { MainDashboardSection } from '@/components/maindashboardsection'
import { LeaderBoard } from '@/components/leaderboard'
import { Exchange } from '@/components/exchange'
import { useState } from 'react'
import { Footer } from '@/components/single-components'


export default function Home() {
    const [isMenu, setIsMenu] = useState<boolean>(false)

    return (
        <section className="flex md:max-h-screen gap-4">
            <SideNav isMenu={isMenu} func={() => setIsMenu(false)} />

            <div className="w-full p-4 lg:py-6 md:pl-2 md:pr-6 overflow-y-auto overflow-x-hidden">
                <Header func={() => setIsMenu(true)} />
                <div className="_xq7m2r hidden items-center justify-between gap-1 p-2 md:py-1 rounded-md mt-4">
                    <div className="flex gap-1 md:items-center">
                        <GiftIcon strokeWidth={1.5} className="min-w-8 translate-y-0.5 lg:translate-y-0" />
                        <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quam ex blanditiis ratione! Impedit repellendus consectetur odit molestiae vitae.</p>
                    </div>
                    <button title="Close alert" type="button" className="">
                        <XIcon strokeWidth={1.5} size={20} />
                    </button>
                </div>

                <div className="flex flex-col gap-4 xl:flex-row mt-4 md:gap-6">
                    <MainDashboardSection />

                    <div className="min-w-1/4 lg:grid lg:grid-cols-3 xl:w-1/4 h-full xl:flex flex-1 flex-col gap-4 md:gap-6">
                        <div className="_ftye7e p-4 rounded-md h-fit relative font-manrope">
                            <div className="absolute inset-0 backdrop-blur rounded-xl"></div>
                            <div className="relative leading-snug">
                                <h2 className="text-xl font-bold leading-none">Get more powerful features now!</h2>
                                <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis cum, autem ex ullam molestias harum.</p>

                                <div className="flex gap-2 text-sm font-semibold mt-4 xl:flex-row flex-wrap">
                                    <button className="bg-white p-2 px-4 rounded-full text-black w-full">Upgrade to Pro</button>
                                    <button className="bg-black/20 p-2 px-4 rounded-full w-full">Get 20% off for today</button>
                                </div>
                            </div>
                        </div>

                        <LeaderBoard />
                        <Exchange />
                    </div>
                    <div className="md:hidden">
                        <Footer />
                    </div>
                </div>
            </div>
        </section>
    )
}
