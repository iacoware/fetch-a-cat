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
                    onError: { target: "error" },
                },
            },
            fetched: {
                on: {
                    FETCH: { target: "fetching" },
                },
            },
            error: {},
        },
    },
    {
        actions: {
            setCats: assign<Context, Events>({
                cats: (_, ev) => (ev as DoneInvokeEvent<Cat[]>).data,
            }),
        },
        services: {
            fetchCats: () => fetchCats(),
        },
    },
)
