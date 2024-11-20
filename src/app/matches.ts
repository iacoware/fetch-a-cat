import { AnyStateMachine, StateFrom, StateValueFrom } from "xstate"
import { fetchACat, FetchACatStates } from "./fetch-a-cat-machine"

type TypestatesA = Array<{
    value: unknown
    context: unknown
}>
type TypestatesU = { value: unknown; context: unknown }

type ContextForValue<V> = Extract<FetchACatStates, { value: V }>["context"]
type ContextForValue2<TS extends TypestatesU, V> = Extract<
    TS,
    { value: V }
>["context"]

export const matches0 = <
    T extends StateFrom<typeof fetchACat>,
    V extends StateValueFrom<typeof fetchACat>,
>(
    state: T,
    value: V,
): state is T & { context: ContextForValue<V> } => {
    return state.matches(value)
}

export const matches1 = <
    M extends AnyStateMachine,
    S extends StateFrom<M> = StateFrom<M>,
    V extends S["value"] = StateValueFrom<M>,
>(
    state: S,
    value: V,
): state is S & { context: ContextForValue2<FetchACatStates, V> } => {
    return state.matches(value)
}

export const matches2 = <
    TS extends TypestatesU,
    M extends AnyStateMachine = AnyStateMachine,
    S extends StateFrom<M> = StateFrom<M>,
    V extends StateFrom<M>["value"] = StateValueFrom<M>,
>(
    state: S,
    value: V,
): state is S & { context: ContextForValue2<TS, V> } => {
    return state.matches(value)
}
