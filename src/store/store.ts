import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface theme {
    theme: string
    toggleTheme: (isTheme: string) => void
}

interface send {
    sendCoin: string
    selectSendCoin: (coin: string) => void
}

interface recv {
    recvCoin: string
    selectRecvCoin: (coin: string) => void
}

export const useThemeStore = create<theme>()(
    persist(
        (set) => ({
            theme: 'dark',
            toggleTheme: (theme) => set({ theme }),
        }),
        {
            name: 'theme',
        }
    )
)

export const useSendStore = create<send>((set) => ({
    sendCoin: 'bitcoin',
    selectSendCoin: (sendCoin) => set({ sendCoin })
}))

export const useRecvStore = create<recv>((set) => ({
    recvCoin: 'ethereum',
    selectRecvCoin: (recvCoin) => set({ recvCoin })
}))
