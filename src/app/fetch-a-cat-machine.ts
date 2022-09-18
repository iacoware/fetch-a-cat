import { assign, createMachine, DoneInvokeEvent } from "xstate"
import { Cat, fetchCats } from "../common/api"

type Context = { cats: Cat[]; selected?: Cat }
type SelectedEvent = { type: "SELECT"; selected: Cat }
type Events = { type: "FETCH" } | SelectedEvent | { type: "UNSELECT" }

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
                initial: "unselected",
                states: {
                    unselected: {
                        on: {
                            FETCH: { target: "#fetch-a-cat.fetching" },
                            SELECT: {
                                target: "selected",
                                actions: ["setSelected"],
                            },
                        },
                    },
                    selected: {
                        on: {
                            UNSELECT: {
                                target: "unselected",
                                actions: ["clearSelected"],
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
    },
    {
        actions: {
            setCats: assign<Context, Events>({
                cats: (_, ev) => (ev as DoneInvokeEvent<Cat[]>).data,
            }),
            clearCats: assign<Context, Events>({
                cats: () => [],
            }),
            setSelected: assign<Context, Events>({
                selected: (_, ev) => (ev as SelectedEvent).selected,
            }),
            clearSelected: assign<Context, Events>({
                selected: () => undefined,
            }),
        },
        services: {
            fetchCats: () => fetchCats(),
        },
    },
)
