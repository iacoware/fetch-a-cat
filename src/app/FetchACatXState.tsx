import React from "react"
import { useMachine } from "@xstate/react"
import { fetchACat, matches } from "./fetch-a-cat-machine"
import Masonry from "react-responsive-masonry"
import { Cat } from "../common/api"

export const FetchACatXState: React.FC = () => {
    const [state, send] = useMachine(fetchACat)

    const onFetch = () => send({ type: "FETCH" })
    const onSelect = (cat: Cat) => send({ type: "SELECT", selected: cat })
    const onUnselect = () => send({ type: "UNSELECT" })

    const isLoading = state.matches("fetching")
    const cats = state.context.cats

    if (matches(state, { fetched: "selected" })) {
        const a = state.context.selected
    }

    return (
        <div className="app-container">
            <h1>Fetch-a-Cat - XState</h1>
            <pre>{JSON.stringify(state.value)}</pre>
            <button onClick={onFetch}>Fetch</button>

            {state.matches("notYetFetched") && (
                <div>No cats yet. Please press the Fetch button</div>
            )}
            {state.matches("fetching") && (
                <div>Cats are coming, please be patient</div>
            )}
            {state.matches("error") && <div>We have an error, sorry</div>}

            <div className={`img-container ${isLoading ? "is-loading" : ""}`}>
                <Masonry columnsCount={3}>
                    {cats.map((c) => (
                        <img
                            key={c.id}
                            src={c.url}
                            onClick={() => onSelect(c)}
                        />
                    ))}
                </Masonry>
                {matches(state, { fetched: "selected" }) && (
                    <div className="modal">
                        <img
                            key={state.context.selected.id}
                            src={state.context.selected.url}
                            onClick={onUnselect}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
