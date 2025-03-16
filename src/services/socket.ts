import { updateCryptoPrice } from "../store/cryptoSlice"
import store  from '../store/store'

export type BinanceTickerData = {
    stream: string
    data: {
        c: number
        P: number
        s: string
    }
}

const streams = [
    'btcusdt@ticker',
    'ethusdt@ticker',
    'bnbusdt@ticker',
    'adausdt@ticker',
    'xrpusdt@ticker',
    'eosusdt@ticker',
    'neousdt@ticker',
    'ltcusdt@ticker',
    'qtumusdt@ticker',
    'tusdusdt@ticker',
    //и т.д
].join('/')

export const setupSocket = () => {
    const socket = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
    socket.onopen = () => {
        console.log('Connected to Binance WebSocket API')
    }
    socket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data)
        if (data.stream.endsWith('@ticker')) {
            const name = (data.data.s)
            const price = parseFloat(data.data.c)
            const change24h = parseFloat(data.data.P)
            store.dispatch(updateCryptoPrice({ name, price, change24h }))
        }
    }
    socket.onerror = (error) => {
        console.error('WebSocket Error:', error)
    }
    socket.onclose = () => {
        console.log('WebSocket disconnected')
        setTimeout(setupSocket, 3000)
    }
    return() =>{
        socket.close()
    }
}

