import React, { useState } from "react"
import { Cat, fetchCats } from "../common/api"
import Masonry from "react-responsive-masonry"

export const FetchACat: React.FC = () => {
    const [cats, setCats] = useState<Cat[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onFetch = () => {
        setIsLoading(true)
        fetchCats()
            .then(setCats)
            .then((c) => {
                setIsLoading(false)
                return c
            })
    }

    return (
        <div className="app-container">
            <h1>Fetch-a-Cat</h1>
            <button onClick={onFetch}>Fetch</button>
            {isLoading && <div>Cats are coming, please be patient</div>}
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
