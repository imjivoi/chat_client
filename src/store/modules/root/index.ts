import { IRootState } from "@/store/interfaces/root";
import { Module, ModuleTree } from "vuex";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";

import auth from "../auth";
import chat from "../chat";

const modules: ModuleTree<IRootState> = {
  auth,
  chat,
};

export const root: Module<IRootState, IRootState> = {
  modules,
};

export type RootStoreModuleTypes<S = IRootState> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
>;
