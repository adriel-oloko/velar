import { CheckCircle2Icon, CoinsIcon, Loader2Icon } from 'lucide-react'
import { DropDown, LabelTitle } from './single-components'
import { useState } from 'react'
import { Coin, ExchangeCardProps } from '@/types'

export function Exchange() {
    const [toAmount, setToAmount] = useState<number>(0)
    const [recvAmount, setRecvAmount] = useState<number>(0)

    const [sendCoin, setSendCoin] = useState<string>('bitcoin')
    const [recvCoin, setRecvCoin] = useState<string>('ethereum')

    const [swapState, setSwapState] = useState<number>(0) //0: normal; 1: loading; 2: submitted;

    return (
        <div className="bg-custom-white dark:bg-custom-black p-4 rounded-md flex flex-col gap-4">
            <LabelTitle icon={<CoinsIcon />} label="Exchange" isMenu={true} />

            <ExchangeCard label={'Send'} amount={toAmount} coin={sendCoin} selectCoin={(e: string) => setSendCoin(e)} setAmount={(e: number) => setToAmount(e)} />
            <ExchangeCard label={'Receive'} amount={recvAmount} coin={recvCoin} selectCoin={(e: string) => setRecvCoin(e)} setAmount={(e: number) => setRecvAmount(e)} />

            <button className="_ftye7e p-2 text-white font-medium rounded-full text-lg" onClick={ () => setSwapState((prev) => prev-1)}>{ swapState == 0 && 'Swap' }{ swapState == 1 && <Loader2Icon className='mx-auto animate-spin' /> }{ swapState == 2 && <CheckCircle2Icon className='mx-auto' /> }</button>
        </div>
    )
}

export function ExchangeCard({ label, amount, coin, selectCoin, setAmount }: ExchangeCardProps) {
    const coinList: Record<Coin, string> = { bitcoin: 'btc', avalanche: 'avax', ethereum: 'eth', solana: 'sol', cardano: 'ada', polygon: 'matic', chainlink: 'link' }
    const coinRate: Record<string, number> = {
        BTC: 115800.95,
        AVAX: 23.53,
        ETH: 4022.58,
        SOL: 194.29,
        ADA: 0.6708,
        MATIC: 0.2007,
        LINK: 23.83,
    }

    return (
        <div className="grid grid-cols-2 items-center gap-x-4 gap-y-4 bg-white p-4 rounded-lg w-full dark:bg-black text-background dark:text-foreground">
            <p className="text-black dark:text-white/60">{label}</p>
            <div className="">
                <DropDown image={`coins/${coin}.png`} label={coin} func={(e: string) => selectCoin(e)} />
            </div>

            <div className="flex w-full items-end gap-2">
                <input title={label} onChange={(e) => setAmount(Number(e.target.value))} type="number" className="text-2xl font-medium flex-1 py-0 w-1/2 outline-0 translate-y-1 md:translate-y-0" value={amount} />
                <p className="w-fit uppercase text-sm font-medium">{coinList[coin]}</p>
            </div>

            <p className="text-gray-400 text-xs text-right w-full text-nowrap translate-y-1.5">Value = ${coinRate[coinList[coin].toUpperCase()] * amount}</p>
        </div>
    )
}
