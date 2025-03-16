import { AssetsList } from "../AssetsList/AssetsList"
import { AddAssetForm } from "../AddAssetForm/AddAssetForm"

export const App: React.FC = () => {
    return (
        <div className="main__container">
            <div className="header">
                <h1 className="header__title">Portfolio Overview</h1>
                <AssetsList />
            </div>
            <AddAssetForm />
        </div>
    )
}