import { useDispatch } from "react-redux"
import { Crypto, deleteAsset } from "../../store/cryptoSlice"


export const AssetRow = ({ asset }: { asset: Crypto }) => {
    const dispatch = useDispatch()
    return (
        <div onClick={() => dispatch(deleteAsset(asset.id))} className="asset__row__container">
            <div className="asset__row__element">
                <p>Актив</p>
                <p >{asset.name}</p>
            </div>
            <div className="asset__row__element">
                <p>Стоимость</p>
                <p >{asset.price}</p>
            </div>
            <div className="asset__row__element">
                <p>Кол-во</p>
                <p >{asset.quantity}</p>
            </div>
            <div className="asset__row__element">
                <p>сумма</p>
                <p >{asset.totalValue}$</p>
            </div>
            <div className="asset__row__element">
                <p>Изм. за 24ч.</p>
                <p >{asset.change24h}%</p>
            </div>
            <div className="asset__row__element">
                <p>% портфеля</p>
                <p >{asset.percentage}%</p>
            </div>
        </div>
    )
}