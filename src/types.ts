export type Coin = string

export type SideNavProps = {
    isMenu: boolean
    func: () => void
}

export type SideNavEntryProps = {
    icon: React.ReactElement
    label: string
    link?: string
    hasExpand?: boolean
    isActive: boolean
    subEntries?: [React.ReactElement, string][]
    func?: () => void
}

export type ExchangeCardProps = {
    label: string
    amount: number
    coin: Coin
    selectCoin: (e: string) => void
    setAmount: (e: number) => void
}

export type HeaderProps = {
    func: () => void
}

export type StakingActionModalProps = {
    selected: number
}

export type LeaderBoardProps = {
    label: string
    selected: string
    func: (label: string) => void
}
