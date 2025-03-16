import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Asset = {
    id: string
    name: string
    quantity: number
    price: number
    change24h: number
}

type PortfolioState = {
    assets: Asset[]
    totalValue: number
}



const InitialPortfolioState: PortfolioState = {
    assets: [],
    totalValue: 0,
}

const portfolioSlice = createSlice({
    name: 'assets',
    initialState: InitialPortfolioState,
    reducers: {
        addAsset: (state, action: PayloadAction<Asset>) => {
            const asset: Asset = action.payload
            const existingAsset = state.assets.find((a) => a.id === asset.id)
            if (existingAsset) {
                existingAsset.quantity += 1
            } else {
                state.assets.push(asset)
            }
            state.totalValue += asset.price * asset.quantity
        },
        updadteAssetPrice: (
            state,
            action: PayloadAction<{ id: string, price: number, change24h: number }>
        ) => {
            const { id, price, change24h } = action.payload
            const asset = state.assets.find((a) => a.id === id)
            if (asset) {
                asset.price = price
                asset.change24h = change24h
                state.totalValue = state.assets.reduce(
                    (total, a) => total + a.price * a.quantity,
                    0
                )
            }
        },
    }
})

export const { addAsset, updadteAssetPrice } = portfolioSlice.actions
export default portfolioSlice.reducer