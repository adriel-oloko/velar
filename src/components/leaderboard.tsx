import { AwardIcon } from 'lucide-react'
import { LabelTitle, LeaderBoardSelection } from './single-components'
import Image from 'next/image'
import { useState } from 'react'

export function LeaderBoard() {
    const [leaderboardSelection, setLeaderboardSelection] = useState<string>('new')
    return (
        <div className="bg-custom-white dark:bg-custom-black p-4 rounded-md flex flex-col gap-4">
            <LabelTitle icon={<AwardIcon />} label='Leaderboard' isMenu={true} />

            <div className="bg-white dark:bg-black p-1 grid grid-cols-3 gap-1 rounded text-sm text-gray-500/60 font-medium">
            <LeaderBoardSelection label='new' func={() => setLeaderboardSelection('new')} selected={leaderboardSelection} />
            <LeaderBoardSelection label='trending' func={() => setLeaderboardSelection('trending')} selected={leaderboardSelection} />
            <LeaderBoardSelection label='gain' func={() => setLeaderboardSelection('gain')} selected={leaderboardSelection} />
               </div>

            <table className="w-full border-spacing-x-1 border-spacing-y-2 border-separate text-sm">
                <thead>
                    <tr className="font-medium text-gray-500/60 text-left">
                        <th>Name</th>
                        <th>Volume</th>
                        <th className="text-right">Change</th>
                    </tr>
                </thead>

                <tbody>
                    {['Bitcoin', 'Solana', 'Avalanche', 'Cardano'].map((entry, key) => {
                        return (
                            <tr key={key} className='text-background dark:text-foreground'>
                                <td>
                                    <div className="flex gap-2 items-center">
                                        <Image src={`/coins/${entry}.png`} className={`size-5 ${entry}`} width={2000} height={2000} alt="" />
                                        <span className="font-medium">{entry }</span>
                                    </div>
                                </td>
                                <td>$24,54m</td>
                                <td>
                                    <div className="bg-gradient-to-r from-transparent to-green-500/50 rounded p-1 pr-2 text-right text-green-600 font-medium">24.56%</div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
