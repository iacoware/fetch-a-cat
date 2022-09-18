import { createMachine } from "xstate"

export const fetchACat = createMachine({
    id: "fetch-a-cat",
    initial: "notYetFetched",
    states: {
        notYetFetched: {},
        fetching: {},
        fetched: {},
        error: {},
    },
})
