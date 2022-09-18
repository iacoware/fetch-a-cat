import React, { useState } from "react"
import { Cat, fetchCats } from "../common/api"
import Masonry from "react-responsive-masonry"

export const FetchACat: React.FC = () => {
    const [cats, setCats] = useState<Cat[]>([])

    const onFetch = () => {
        fetchCats().then(setCats)
    }

    return (
        <div className="app-container">
            <h1>Fetch-a-Cat</h1>
            <button onClick={onFetch}>Fetch</button>
            <Masonry columnsCount={3}>
                {cats?.map((c) => (
                    <img key={c.id} src={c.url} />
                ))}
            </Masonry>
        </div>
    )
}
