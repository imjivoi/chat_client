import { createStore } from "vuex";
import { IRootState } from "./interfaces/root";
import { AuthStoreModuleTypes } from "./modules/auth/types";
import { RootStoreModuleTypes, root } from "./modules/root";

export const store = createStore<IRootState>(root);
type StoreModules = {
  auth: AuthStoreModuleTypes;
  root: typeof root;
};

export type Store = AuthStoreModuleTypes<Pick<StoreModules, "auth">> &
  RootStoreModuleTypes<Pick<StoreModules, "root">>;
