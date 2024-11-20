import { assign, createMachine, DoneInvokeEvent } from "xstate"
import { Cat, delay, fetchCats } from "../common/api"

type InitialContext = { cats: Cat[]; selected?: Cat }
type SelectedContext = { cats: Cat[]; selected: Cat }
type ErrorContext = { cats: Cat[]; error: any }
type Context = { cats: Cat[]; selected?: Cat; error?: any }

// Improve type safety with Typestates (optional)
// see https://xstate.js.org/docs/guides/typescript.html#typestates
type Typestates =
    | {
          value: "notYetFetched" | "fetching" | "fetched.unselected"
          context: InitialContext
      }
    | { value: "fetched.selected"; context: SelectedContext }
    | { value: "error"; context: ErrorContext }

type SelectedEvent = { type: "SELECT"; selected: Cat }
type Events = { type: "FETCH" } | SelectedEvent | { type: "UNSELECT" }

export const fetchACat = createMachine<Context, Events, Typestates>(
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
                    onError: {
                        target: "error",
                        actions: ["setError", "clearCats"],
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
                                actions: ["setSelected"],
                            },
                        },
                    },
                    selected: {
                        on: {
                            SELECT: {
                                actions: ["setSelected"],
                            },
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
            setCats: assign({
                cats: (ctx, ev) => (ev as DoneInvokeEvent<Cat[]>).data,
            }),
            clearCats: assign({
                cats: (ctx, ev) => [],
            }),
            setSelected: assign({
                selected: (ctx, ev) => (ev as SelectedEvent).selected,
            }),
            clearSelected: assign({
                selected: (ctx, ev) => undefined,
            }),
            setError: assign({
                error: (ctx, ev) => "fetchCats api error",
            }),
        },
        services: {
            fetchCats: async () => {
                // Too fast, slow it down
                await delay(1000)
                return fetchCats()
            },
        },
    },
)
