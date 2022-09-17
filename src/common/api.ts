export type Cat = {
    id: string
    url: string
    width: number
    height: number
}

export const fetchCats = (signal?: AbortSignal): Promise<Cat[]> =>
    fetch("https://api.thecatapi.com/v1/images/search?limit=9", {
        signal: signal,
    }).then((response) => response.json())

export const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))
