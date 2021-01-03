import { IRootState } from "@/store/interfaces/root";
import { Module, ModuleTree } from "vuex";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";

import AuthModule from "../auth";

const modules: ModuleTree<IRootState> = {
  AuthModule,
};

export const root: Module<IRootState, IRootState> = {
  modules,
};

export type RootStoreModuleTypes<S = IRootState> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
>;
