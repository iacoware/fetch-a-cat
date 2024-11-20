import { assertEvent, assign, DoneActorEvent, fromPromise, setup } from "xstate"
import { Cat, delay, fetchCats } from "../common/api"

type InitialContext = { cats: Cat[]; selected?: Cat }
type SelectedContext = { cats: Cat[]; selected: Cat }
type ErrorContext = { cats: Cat[]; error: unknown }
type Context = { cats: Cat[]; selected?: Cat; error?: unknown }

export type FetchACatStates =
    | { value: "notYetFetched"; context: InitialContext }
    | { value: "fetching"; context: InitialContext }
    | { value: "fetched"; context: InitialContext }
    | { value: { fetched: "unselected" }; context: InitialContext }
    | { value: { fetched: "selected" }; context: SelectedContext }
    | { value: "error"; context: ErrorContext }

type SelectedEvent = { type: "SELECT"; selected: Cat }
type Events =
    | { type: "FETCH" }
    | SelectedEvent
    | { type: "UNSELECT" }
    | DoneActorEvent<Cat[]>

export const fetchACat = setup({
    types: {
        context: {} as Context,
        events: {} as Events,
    },
    actions: {
        setCats: assign({
            cats: ({ event: ev }) => {
                assertEvent(ev, "xstate.done.actor.fetchCats")
                return ev.output
            },
        }),
        clearCats: assign({
            cats: () => [],
        }),
        setSelected: assign({
            selected: ({ event: ev }) => {
                assertEvent(ev, "SELECT")
                return ev.selected
            },
        }),
        clearSelected: assign({
            selected: () => undefined,
        }),
        setError: assign({
            error: () => "fetchCats api error",
        }),
    },
    actors: {
        fetchCats: fromPromise(async () => {
            // Too fast, slow it down
            await delay(1000)
            return fetchCats()
        }),
    },
}).createMachine({
    id: "fetch-a-cat",
    initial: "notYetFetched",
    context: {
        cats: [],
    },
    states: {
        notYetFetched: {
            on: {
                FETCH: { target: "fetching" },
            },
        },
        fetching: {
            invoke: {
                id: "fetchCats",
                src: "fetchCats",
                onDone: {
                    target: "fetched",
                    actions: [{ type: "setCats" }],
                },
                onError: {
                    target: "error",
                    actions: [{ type: "setError" }, { type: "clearCats" }],
                },
            },
        },
        fetched: {
            initial: "unselected",
            states: {
                unselected: {
                    on: {
                        FETCH: { target: "#fetch-a-cat.fetching" },
                        SELECT: {
                            target: "selected",
                            actions: [{ type: "setSelected" }],
                        },
                    },
                },
                selected: {
                    on: {
                        SELECT: {
                            actions: [{ type: "setSelected" }],
                        },
                        UNSELECT: {
                            target: "unselected",
                            actions: [{ type: "clearSelected" }],
                        },
                    },
                },
            },
        },
        error: {
            on: {
                FETCH: { target: "fetching" },
            },
        },
    },
})
