import { CircleSmallIcon, InfoIcon, EllipsisIcon, GemIcon } from 'lucide-react'
import { EllipseButton, LabelTitle, SwipeButton } from './single-components'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { StakingActionModalProps } from '@/types'

export function Staking() {
    return (
        <div className="p-4 md:pb-0 max-h-fit bg-custom-white dark:bg-custom-black rounded-lg max-w-full relative">
            <div className="grid gap-4">
                <StakingHeader />
                <StakingTable />
            </div>
        </div>
    )
}

export function StakingHeader() {
    const [toggleState, setToggleState] = useState<boolean>(false)
    return (
        <div className="flex justify-between items-end md:items-center">
            <h2 className="text-background dark:text-white font-medium capitalize translate-y-0.5 md:translate-y-0 md:text-lg flex gap-2 items-center md:font-semibold">
                <LabelTitle icon={<GemIcon />} label="staking assets" isMenu={false} />
            </h2>

            <div className="flex flex-col gap-2 items-end md:flex-row-reverse md:gap-4">
                <EllipseButton />
                <div className="flex gap-2 items-center">
                    <span className="text-sm text-gray-400 dark:text-gray-300/50 font-medium">Auto Savings</span>
                    <SwipeButton toggleState={toggleState} func={() => setToggleState((prev) => !prev)} />
                </div>
            </div>
        </div>
    )
}

export function StakingTable() {
    const stakingColumns = ['Asset', 'Amount', 'Type', 'Value (USD)', 'Profit', 'APY', 'Maturity Date', 'Duration']
    const stakingData = [
        ['Bitcoin', '1.8 BTC', 'Fixed', '$142,368.35', '+$4,856.12', '3.48%', '210/365', '27/09/25 09:08 AM', 'BTC'],
        ['Ethereum', '12.69 ETH', 'Flexible', '$30,913.25', '+$1,089.34', '2.20%', '126/365', '26/05/25 07:50 AM', 'ETH'],
        ['Cardano', '15,058 ADA', 'Fixed', '$6,223.38', '-$102.55', '1.95%', '84/180', '05/01/25 11:32 AM', 'ADA'],
        ['Chainlink', '1,200 LINK', 'Fixed', '$18,774.68', '-$423.21', '3.05%', '179/365', '03/07/25 10:17 AM', 'LINK'],
        ['Avalanche', '852 AVAX', 'Flexible', '$29,408.42', '+$689.44', '2.74%', '244/365', '29/09/25 01:03 PM', 'AVAX'],
        ['Solana', '100 SOL', 'Fixed', '$12,943.67', '+$318.09', '2.48%', '193/365', '15/07/25 06:45 AM', 'SOL'],
        ['Polygon', '9,875 MATIC', 'Flexible', '$5,732.11', '-$162.44', '1.65%', '96/180', '12/02/25 08:22 PM', 'MATIC'],
        ['BNB', '27.3 BNB', 'Fixed', '$17,984.29', '+$567.92', '2.92%', '155/365', '09/06/25 02:18 PM', 'BNB'],
        ['Dogecoin', '46,000 DOGE', 'Flexible', '$4,283.90', '+$91.76', '1.32%', '72/180', '31/12/24 10:56 AM', 'DOGE'],
        ['Arbitrum', '1,640 ARB', 'Fixed', '$3,702.67', '+$134.23', '2.08%', '133/365', '20/04/25 05:33 PM', 'ARB'],
    ]

    function getProgressPercent(duration: string): number {
        const [current, total] = duration.split('/').map(Number)
        return parseInt(((current / total) * 100).toFixed(2))
    }

    const [selected, setSelected] = useState<number | null>(null)
    const [isInfo, setIsInfo] = useState<boolean>(false)
    const [isAction, setIsAction] = useState<boolean>(false)

    const closeModal = () => {
        setSelected(null)
        setIsInfo(false)
        setIsAction(false)
    }

    return (
        <div className="overflow-x-scroll flex relative">
            <table className={`text-nowrap align-middle shrink-0 ${selected != null && 'opacity-50 blur-xs'}`}>
                <thead>
                    <tr className="text-sm text-gray-500">
                        {stakingColumns.map((entry, key) => {
                            return (
                                <th key={key} className="text-left last-of-type:text-right pr-8">
                                    {entry}
                                </th>
                            )
                        })}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="">
                    {stakingData.map((entry, key) => {
                        return (
                            <tr key={key} className="text-nowrap align-middle text-background dark:text-foreground font-medium">
                                <td onClick={closeModal} className="pr-8 font-medium">
                                    <div className="flex items-center gap-2">
                                        <Image src={`/coins/${entry[0].toLowerCase()}.png`} className={`size-6 bg-white rounded-full ${entry[8]}`} width={2000} height={2000} alt="" />
                                        <p className="">
                                            {entry[0]}
                                            <span className="text-gray-500/70 text-xs font-medium">/{entry[8]}</span>
                                        </p>
                                    </div>
                                </td>
                                <td onClick={closeModal} className="pr-8">
                                    {entry[1]}
                                </td>
                                <td onClick={closeModal} className="pr-8">
                                    {entry[2]}
                                </td>
                                <td onClick={closeModal} className="pr-8">
                                    {entry[3]}
                                </td>
                                <td onClick={closeModal} className="pr-8">
                                    <div className="flex flex-col justify-center items-end py-1">
                                        <span className="text-xs text-gray-500/70">0.000004</span>
                                        <span className={`${entry[4][0] == '+' ? 'text-green-500' : 'text-red-500'}`}>{entry[4]}</span>
                                    </div>
                                </td>
                                <td onClick={closeModal} className="pr-8">
                                    {entry[5]}
                                </td>
                                <td onClick={closeModal} className="pr-8">
                                    {entry[7]}
                                </td>
                                <td onClick={closeModal} className="pr-8 text-right">
                                    <div className="flex flex-col items-end gap-1">
                                        <span>{entry[6]}</span>
                                        <div className={`h-1 w-full relative bg-gradient-to-r from-transparent to-transparent ${getProgressPercent(entry[6]) > 50 ? 'via-green-500 text-green-600' : 'via-red-500 text-red-500'}`}>
                                            <CircleSmallIcon size={16} strokeWidth={3} className={`absolute top-1/2 -translate-y-1/2 fill-custom-white dark:fill-custom-black left-[${getProgressPercent(entry[6])}%]`} style={{ left: `${getProgressPercent(entry[6])}%` }} />
                                        </div>
                                    </div>
                                </td>
                                <td className="pr-2 hidden">
                                    <button
                                        onClick={() => {
                                            setSelected(key)
                                            setIsInfo(true)
                                            setIsAction(false)
                                            isAction && closeModal
                                        }}
                                        className="p-1 bg-black rounded px-4 py-1 h-fit w-fit">
                                        <InfoIcon size={16} />
                                    </button>
                                </td>

                                <td className="relative">
                                    <EllipseButton
                                        func={() => {
                                            if (isAction) {
                                                closeModal()
                                            } else {
                                                setSelected(key)
                                                setIsInfo(false)
                                                setIsAction(true)
                                            }
                                        }}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {(selected || selected == 0) && isAction && <StakingActionModal selected={selected} />}
            {/*(selected !== null && (selected || selected === 0) && isInfo) && <StakingInfoModal selected={selected!} />*/}
        </div>
    )
}

export function StakingInfoModal({ selected }: StakingActionModalProps) {
    return (
        <div className="relative shrink-0 max-w-0 -ml-40">
            <div style={{ top: `${60 + selected * 50}px` }} className="absolute w-56 mx-auto z-40 text-sm rounded-md text-left grid grid-cols-2 gap-2 p-2 text-foreground bg-background dark:text-background font-semibold -translate-x-30 dark:bg-foreground">
                <p className="">Asset</p>
                <p className="">Bitcoin (BTC)</p>

                <p className="">Start Date</p>
                <p className="">30/03/2024 10:42 AM</p>

                <p className=""></p>
            </div>
        </div>
    )
}

export function StakingActionModal({ selected }: StakingActionModalProps) {
    return (
        <div className="relative shrink-0 max-w-0 -ml-40">
            <div style={{ top: `${60 + selected * 50}px` }} className="absolute w-40 mx-auto z-40 text-sm rounded-md text-left flex flex-col gap-2 items-end justify-end text-background font-semibold">
                <button className="p-2 bg-background text-foreground dark:bg-foreground dark:text-background rounded-md w-fit text-left">Claim Rewards</button>
                <button className="p-2 bg-background text-foreground dark:bg-foreground dark:text-background rounded-md w-fit text-left">Unstake</button>
                <button className="p-2 bg-background text-foreground dark:bg-foreground dark:text-background rounded-md w-fit text-left">Reinvest</button>
            </div>
        </div>
    )
}
