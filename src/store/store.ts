import { configureStore } from '@reduxjs/toolkit'
import cryptoReducer from './cryptoSlice'

const store = configureStore({
    reducer: cryptoReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store