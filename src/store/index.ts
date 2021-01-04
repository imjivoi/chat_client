import { createStore } from "vuex";
import { IRootState } from "./interfaces/root";
import { AuthStoreModuleTypes } from "./modules/auth/types";
import { ChatStoreModuleTypes } from "./modules/chat/types";
import { RootStoreModuleTypes, root } from "./modules/root";

export const store = createStore<IRootState>(root);
type StoreModules = {
  chat: ChatStoreModuleTypes;
  auth: AuthStoreModuleTypes;
  root: typeof root;
};

export type Store = ChatStoreModuleTypes<Pick<StoreModules, "chat">> &
  AuthStoreModuleTypes<Pick<StoreModules, "auth">> &
  RootStoreModuleTypes<Pick<StoreModules, "root">>;
