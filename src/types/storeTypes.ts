import store from "../store";

export type IRootStoreType = ReturnType<typeof store.getState>;
