import { assign, createMachine, DoneInvokeEvent } from "xstate"
import { Cat, fetchCats } from "../common/api"

type Context = { cats: Cat[] }
type Events = { type: "FETCH" }

export const fetchACat = createMachine<Context, Events>(
    {
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
                    src: "fetchCats",
                    onDone: { target: "fetched", actions: ["setCats"] },
                    onError: { target: "error", actions: ["clearCats"] },
                },
            },
            fetched: {
                on: {
                    FETCH: { target: "fetching" },
                },
            },
            error: {
                on: {
                    FETCH: { target: "fetching" },
                },
            },
        },
    },
    {
        actions: {
            setCats: assign<Context, Events>({
                cats: (_, ev) => (ev as DoneInvokeEvent<Cat[]>).data,
            }),
            clearCats: assign<Context, Events>({
                cats: () => [],
            }),
        },
        services: {
            fetchCats: () => fetchCats(),
        },
    },
)
