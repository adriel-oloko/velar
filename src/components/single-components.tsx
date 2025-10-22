import { LeaderBoardProps } from '@/types'
import { ChevronDown, ChevronsUpDownIcon, CommandIcon, EllipsisIcon, SearchIcon, WalletIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { ConnectButton } from '@rainbow-me/rainbowkit'

type LabelTitleProps = {
    icon: React.ReactElement
    label: string
    isMenu: boolean
}

type DropDownProps = {
    image: string
    label: string
    func: (e: string) => void
}

type SwipeButtonProps = {
    toggleState: boolean
    func: () => void
}

type EllipseButtonProps = {
    func?: () => void
}
export function EllipseButton({ func }: EllipseButtonProps) {
    return (
        <button type="button" onClick={func} className="bg-black rounded px-2 py-0 h-fit w-fit text-white">
            <EllipsisIcon />
        </button>
    )
}

export function LabelTitle({ icon, label, isMenu }: LabelTitleProps) {
    return (
        <div className="flex justify-between items-center gap-2 text-background dark:text-foreground">
            <h2 className="flex text-lg font-semibold items-center gap-2 lg:text-base">
                {icon}
                {label}
            </h2>
            {isMenu && <EllipseButton />}
        </div>
    )
}

export function LeaderBoardSelection({ label, selected, func }: LeaderBoardProps) {
    return (
        <button
            onClick={() => {
                func(label)
            }}
            className={`capitalize transition-all p-1 rounded ${selected == label && 'bg-custom-black text-white'}`}>
            {label}
        </button>
    )
}
export function DropDown({ image, label, func }: DropDownProps) {
    const coins = ['avalanche', 'solana', 'cardano', 'polygon', 'chainlink']
    const [selected, setSelected] = useState<string>(label)
    const [isVisible, setIsVisible] = useState<boolean>(false)

    useEffect(() => {
        //(selected:string) => func(selected)
    }, [selected])

    return (
        <div className="relative">
            <button onClick={() => setIsVisible(true)} className="flex justify-between items-center gap-4 w-full">
                <div className="flex gap-2 items-center font-medium text-sm">
                    <Image src={`/coins/${selected}.png`} className={`size-5 bg-white rounded-full ${selected}`} width={2000} height={2000} alt={image} />
                    <span className="capitalize">{selected}</span>
                </div>

                <ChevronDown strokeWidth={1.5} size={20} />
            </button>

            {isVisible && (
                <div className="bg-custom-black shadow shadow-gray-500/20 rounded w-full h-40 overflow-y-scroll absolute top-8 z-10 grid gap-2 p-2">
                    {coins.map((coin, key) => {
                        return (
                            <button
                                key={key}
                                onClick={() => {
                                    setSelected(coin)
                                    setIsVisible(false)
                                    func(coin)
                                }}
                                className="flex gap-2">
                                <Image src={`/coins/${coin}.png`} className={`size-5 bg-white rounded-full ${coin}`} width={2000} height={2000} alt={image} />
                                <span className="capitalize">{coin}</span>
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export function SearchBar() {
    return (
        <div className="w-92 bg-foreground dark:bg-gray-100/10 px-2.5 py-2 rounded-full flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
                <SearchIcon size={20} className="stroke-background dark:stroke-gray-300/50" />
                <input type="text" className="w-full text-sm text-background dark:text-white placeholder:text-black/50 dark:placeholder:text-gray-300/50" placeholder="Search ..." />
            </div>
            <CommandF />
        </div>
    )
}

export function CommandF() {
    return (
        <div className="flex gap-1 items-center text-sm text-background dark:text-gray-300/50">
            <CommandIcon size={16} />
            <span className="translate-y-0.25">F</span>
        </div>
    )
}

export function SwipeButton({ toggleState, func }: SwipeButtonProps) {
    return (
        <button onClick={func} className={`${toggleState ? 'bg-green-500' : 'bg-gray-200'} w-12 h-6 rounded-full p-0.5 flex relative transition-colors`}>
            <div className={`bg-white _ujr4oi size-5 rounded-full translate-y-0.2 transition-all duration-150 ease-fluid inset-y-0.5 ${toggleState ? 'translate-x-6 rotate-90' : 'translate-x-0 rotate-45 shadow-lg shadow-black/50'} absolute`}></div>
        </button>
    )
}

export function Footer() {
    return (
        <footer className="flex gap-2 justify-between px-1 text-background dark:text-foreground">
            <p className="">Velar. ©2025</p>
            <p className="">All rights reserved</p>
        </footer>
    )
}

export const ConnectWallet = () => {
    return (
        <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
                const ready = mounted
                const connected = ready && account && chain
                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            style: {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}>
                        {(() => {
                            if (!connected) {
                                return (
                                    <button onClick={openConnectModal} type="button" className="bg-black p-2 rounded-lg flex gap-2 items-center mt-4 w-full pr-3">
                                        <WalletIcon fill="#000" size={32} className="p-1.5 bg-gray-900 rounded" />
                                        <span className="truncate">Connect wallet</span>
                                    </button>
                                )
                            }
                            if (chain.unsupported) {
                                return (
                                    <button onClick={openChainModal} type="button" className="bg-black p-2 rounded-lg flex gap-2 items-center mt-4 w-fit pr-3">
                                        <WalletIcon fill="#000" size={32} className="p-1.5 bg-gray-900 rounded" />
                                        <span className="truncate">Wrong network</span>
                                    </button>
                                )
                            }
                            return (
                                <div className="bg-black p-2 rounded-lg flex justify-between items-center mt-4 w-full">
                                    <div className="flex gap-2 items-center">
                                        <WalletIcon fill="#000" size={32} className="p-1.5 bg-gray-900 rounded" />
                                        <div className="flex flex-col gap-1 text-xs font-medium">
                                            <p className="truncate text-gray-600">Your Address</p>
                                            <p className="font-semibold">{account.displayName}</p>
                                        </div>
                                    </div>

                                    <ChevronsUpDownIcon strokeWidth={2} size={20} />
                                </div>
                            )
                        })()}
                    </div>
                )
            }}
        </ConnectButton.Custom>
    )
}
