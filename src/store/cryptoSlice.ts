import { createSlice, PayloadAction, } from "@reduxjs/toolkit"

export type Crypto = {
    id: string
    name: string
    price: number
    change24h: number
    quantity: number
    percentage: number
    totalValue: number
}

const initiaBitcoinlState: Crypto = {
    id: 'BTC',
    name: 'BTCUSDT',
    price: 0,
    change24h: 0,
    quantity: 0,
    percentage: 0,
    totalValue: 0
}

const initialEthereumState: Crypto = {
    id: 'ETH',
    name: 'ETHUSDT',
    price: 0,
    change24h: 0,
    quantity: 0,
    percentage: 0,
    totalValue: 0
}

const initialCardanoState: Crypto = {
    id: 'ADA',
    name: 'ADAUSDT',
    price: 0,
    change24h: 0,
    quantity: 0,
    percentage: 0,
    totalValue: 0
}

const initalBinanceCoinState: Crypto = {
    id: 'BND',
    name: 'BNBUSDT',
    price: 0,
    change24h: 0,
    quantity: 0,
    percentage: 0,
    totalValue: 0
}

const initialXRPState: Crypto = {
    id: 'XRP',
    name: 'XRPUSDT',
    price: 0,
    change24h: 0,
    quantity: 0,
    percentage: 0,
    totalValue: 0
}

const initialEosState: Crypto = {
    id: 'EOS',
    name: 'EOSUSDT',
    price: 0,
    change24h: 0,
    quantity: 0,
    percentage: 0,
    totalValue: 0
}
const initialNeoState: Crypto = {
    id: 'NEO',
    name: 'NEOUSDT',
    price: 0,
    change24h: 0,
    quantity: 0,
    percentage: 0,
    totalValue: 0
}
const initialLtcState: Crypto = {
    id: 'LTC',
    name: 'LTCUSDT',
    price: 0,
    change24h: 0,
    quantity: 0,
    percentage: 0,
    totalValue: 0

}

const initialQTUMState: Crypto = {
    id: 'QTUM',
    name: 'QTUMUSDT',
    price: 0,
    change24h: 0,
    quantity: 0,
    percentage: 0,
    totalValue: 0
}

const initialTUSDState: Crypto = {
    id: 'TUSD',
    name: 'TUSDUSDT',
    price: 0,
    change24h: 0,
    quantity: 0,
    percentage: 0,
    totalValue: 0
}

const initialState = {
    totalValue: 0,
    cryptoStates: [
        initiaBitcoinlState,
        initialEthereumState,
        initialCardanoState,
        initalBinanceCoinState,
        initialXRPState,
        initialEosState,
        initialNeoState,
        initialLtcState,
        initialQTUMState,
        initialTUSDState,
    ]
}

const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        updateCryptoPrice: (
            state,
            action: PayloadAction<{ name: string; price: number; change24h: number }>
        ) => {
            const { name, price, change24h } = action.payload
            state.cryptoStates.forEach((e) => {
                if (e.name === name) {
                    e.price = price
                    e.change24h = change24h
                }
            })
        },
        addAsset: (state, action: PayloadAction<Crypto>) => {
            const asset: Crypto = action.payload
            const existingAsset = state.cryptoStates.find((a) => a.id === asset.id)
            if (existingAsset) {
                existingAsset.quantity += 1
            } else {
                state.cryptoStates.push(asset)
            }
            state.totalValue = asset.price + state.totalValue
            state.cryptoStates.forEach((a) => {
                a.percentage = (a.price * a.quantity / state.totalValue) * 100
                a.percentage = Math.round(a.percentage)
                a.totalValue = a.price * a.quantity
            })
        },
        deleteAsset: (state, action: PayloadAction<string>) => {
            const id = action.payload
            const asset = state.cryptoStates.find((a) => a.id === id)
            if (asset) {
                state.cryptoStates.forEach((a) => {
                    if (a.id === asset.id) {
                        a.quantity = 0
                        a.totalValue = 0
                        a.percentage = 0
                        state.totalValue = state.cryptoStates.reduce(
                            (total, a) => total + a.price * a.quantity,
                            0
                        )
                        state.cryptoStates.forEach((a) => {
                            if(a.quantity !== 0){
                                a.percentage = (a.price * a.quantity) /state.totalValue * 100
                                a.percentage = Math.round(a.percentage)
                            }
                        })
                    }
                })
            }
        }
    },
})

export const { updateCryptoPrice, addAsset, deleteAsset } = cryptoSlice.actions
export default cryptoSlice.reducer