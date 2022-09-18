import React from "react"
import { useMachine } from "@xstate/react"
import { fetchACat } from "./fetch-a-cat-machine"
import Masonry from "react-responsive-masonry"
import { Cat } from "../common/api"

export const FetchACatXState: React.FC = () => {
    const [state, send] = useMachine(fetchACat)

    console.log(state.value, state.context)

    const onFetch = () => send({ type: "FETCH" })
    const onSelect = (cat: Cat) => send({ type: "SELECT", selected: cat })
    const onDeselect = () => send({ type: "UNSELECT" })

    const isLoading = state.matches("fetching")
    const cats = state.context.cats
    const selectedCat = state.context.selected

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
                {state.matches("selected") && (
                    <div className="modal">
                        <img
                            key={selectedCat?.id}
                            src={selectedCat?.url}
                            onClick={onDeselect}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
