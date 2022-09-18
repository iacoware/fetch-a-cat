import { createMachine } from "xstate"
import { Cat } from "../common/api"

type Context = { cats: Cat[] }
type Events = { type: "FETCH" }

export const fetchACat = createMachine<Context, Events>({
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
        fetching: {},
        fetched: {},
        error: {},
    },
})
