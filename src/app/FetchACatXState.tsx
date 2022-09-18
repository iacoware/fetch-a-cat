import React from "react"
import { useMachine } from "@xstate/react"
import { fetchACat } from "./fetch-a-cat-machine"
import Masonry from "react-responsive-masonry"

export const FetchACatXState: React.FC = () => {
    const [state, send] = useMachine(fetchACat)

    console.log(state.value, state.context)

    const onFetch = () => {
        send({ type: "FETCH" })
    }

    const isLoading = state.matches("fetching")
    const cats = state.context.cats

    return (
        <div className="app-container">
            <h1>Fetch-a-Cat - XState</h1>
            <button onClick={onFetch}>Fetch</button>

            {state.matches("notYetFetched") && (
                <div>No cats yet. Please press the Fetch button</div>
            )}
            {state.matches("fetching") && (
                <div>Cats are coming, please be patient</div>
            )}
            {state.matches("error") && <div>We have an error, sorry</div>}

            <div className={isLoading ? "is-loading" : ""}>
                <Masonry columnsCount={3}>
                    {cats.map((c) => (
                        <img key={c.id} src={c.url} />
                    ))}
                </Masonry>
            </div>
        </div>
    )
}
