import React, { useState } from "react"
import { Cat, fetchCats } from "../common/api"
import Masonry from "react-responsive-masonry"

export const FetchACat: React.FC = () => {
    const [cats, setCats] = useState<Cat[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<unknown>(null)

    const onFetch = () => {
        if (isLoading) return

        setIsLoading(true)
        setError(null)
        fetchCats()
            .then(setCats)
            .then((c) => {
                setIsLoading(false)
                return c
            })
            .catch((error) => {
                setIsLoading(false)
                setError(error)
            })
    }

    const isError = !!error

    return (
        <div className="app-container">
            <h1>Fetch-a-Cat</h1>
            <button disabled={isLoading} onClick={onFetch}>
                Fetch
            </button>
            {isLoading && <div>Cats are coming, please be patient</div>}
            {isError && <div>We have an error, sorry</div>}
            {cats.length === 0 && !isLoading && (
                <div>No cats yet. Please press the Fetch button</div>
            )}
            <div className={isLoading ? "is-loading" : ""}>
                <Masonry columnsCount={3}>
                    {cats?.map((c) => (
                        <img key={c.id} src={c.url} />
                    ))}
                </Masonry>
            </div>
        </div>
    )
}
