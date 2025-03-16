import { configureStore } from '@reduxjs/toolkit'
import cryptoReducer from './cryptoSlice'

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cryptoPortfolio')
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return undefined
    }
}

const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('cryptoPortfolio', serializedState)
    }catch {
        console.error('Error saving state to localStorage')
    }
}

const store = configureStore({
    reducer: cryptoReducer,
    preloadedState: loadState(),
})

store.subscribe(() => {
    saveState(store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store