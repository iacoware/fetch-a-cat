import { MachineSnapshot, StateFrom, StateValueFrom } from "xstate"
import { fetchACat, FetchACatStates } from "./fetch-a-cat-machine"

type TypeStateUnknown = { value: unknown; context: unknown }

type ContextForValue<TS extends TypeStateUnknown, V> = Extract<
    TS,
    { value: V }
>["context"]

export const matches0 = <
    S extends StateFrom<typeof fetchACat>,
    V extends StateValueFrom<typeof fetchACat>,
>(
    state: S,
    value: V,
): state is S & { context: ContextForValue<FetchACatStates, V> } => {
    return state.matches(value)
}

// NOTE: It doesn't know that V is valid for FetchACatStates
export const matches1 = <
    S extends MachineSnapshot<any, any, any, any, any, any, any, any>,
    V extends Parameters<S["matches"]>[0],
>(
    state: S,
    value: V,
): state is S & { context: ContextForValue<FetchACatStates, V> } => {
    return state.matches(value)
}

export const matches3 =
    <TS extends TypeStateUnknown>() =>
    <
        S extends MachineSnapshot<any, any, any, any, any, any, any, any>,
        V extends TS["value"],
    >(
        state: S,
        value: V,
    ): state is S & { context: ContextForValue<TS, V> } => {
        return state.matches(value)
    }
