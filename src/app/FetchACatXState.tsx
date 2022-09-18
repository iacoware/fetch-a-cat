import React from "react"
import { useMachine } from "@xstate/react"
import { fetchACat } from "./fetch-a-cat-machine"

export const FetchACatXState: React.FC = () => {
    const [state, send] = useMachine(fetchACat)

    const onFetch = () => {}

    return (
        <div className="app-container">
            <h1>Fetch-a-Cat - XState</h1>
            <button onClick={onFetch}>Fetch</button>
            {/*{isLoading && <div>Cats are coming, please be patient</div>}
            {isError && <div>We have an error, sorry</div>}
            {noCatsYet && <div>No cats yet. Please press the Fetch button</div>}
            <div className={isLoading ? "is-loading" : ""}>
                <Masonry columnsCount={3}>
                    {cats?.map((c) => (
                        <img key={c.id} src={c.url} />
                    ))}
                </Masonry>
            </div>*/}
        </div>
    )
}
