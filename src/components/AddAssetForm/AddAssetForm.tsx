import { useDispatch, useSelector } from 'react-redux'
import { addAsset, Crypto } from '../../store/cryptoSlice'
import { setupSocket } from '../../services/socket'
import { RootState } from '../../store/store'


export const AddAssetForm = () => {
    const dispatch = useDispatch()
    const cryptoState = useSelector((state: RootState) => state.cryptoStates)

    const addToPortfolio = (asset: Crypto) => {
        dispatch(addAsset(asset))
    }


    setupSocket()
    return (
        <div className="assetstoAddcontainer">
            <ul className="assetstoAddlist">
                {cryptoState.map((asset, index) => (
                    <li key={index} className="assettoAddelement">
                        <span
                            className="price">
                            {asset.name} ${asset.price.toFixed(2)}
                        </span>
                        <span
                            className={`change24h> ${asset.change24h < 0 ? 'negative' : 'positive'}`}>
                            {asset.change24h}%
                        </span>
                        <button
                            onClick={() => addToPortfolio(asset)}
                            className="add__button"
                        >Добавить
                        </button>
                    </li>
                ))}
            </ul>
        </div >
    )
}