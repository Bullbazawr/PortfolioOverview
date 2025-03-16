import { AssetRow } from '../AssetRow/AssetRow'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import { Crypto } from '../../store/cryptoSlice'
export const AssetsList = () => {
    const assets = useSelector((state: RootState) => state.cryptoStates)
    const portfolioAssets: Crypto[] = []

    assets.map((e) => {
        if (e.quantity > 0) {
            portfolioAssets.push(e)
        }
    })

    return (
        <div className='assets__list__container'>
            {portfolioAssets.map((asset) => (
                <AssetRow key={asset.id} asset={asset} />
            ))}
        </div>
    )
}