import useSWR from 'swr'
import { WeatherResponse } from '../types/weather'

const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error?.message || 'Failed to fetch weather data')
    }
    return res.json()
}

export const useWeather = (query: string) => {
    const { data, error, isLoading, mutate } = useSWR<WeatherResponse>(
        query !== undefined ? `/api/weather?query=${encodeURIComponent(query)}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
            dedupingInterval: 10000,
            shouldRetryOnError: false
        }
    )

    return {
        weather: data,
        status: isLoading ? "loading" : error ? "error" : data ? "success" : "idle",
        error: error?.message,
        fetchWeather: () => mutate()
    }
}