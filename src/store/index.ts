import { createStore } from "vuex";
import { IRootState } from "./interfaces/root";
import { AuthStoreModuleTypes } from "./modules/auth/types";
import { ChatStoreModuleTypes } from "./modules/chat/types";
import { FriendsStoreModuleTypes } from "./modules/friends/types";
import { RootStoreModuleTypes, root } from "./modules/root";

export const store = createStore<IRootState>(root);
type StoreModules = {
  friends: FriendsStoreModuleTypes;
  chat: ChatStoreModuleTypes;
  auth: AuthStoreModuleTypes;
  root: RootStoreModuleTypes;
};

export type Store = FriendsStoreModuleTypes<Pick<StoreModules, "friends">> &
  ChatStoreModuleTypes<Pick<StoreModules, "chat">> &
  AuthStoreModuleTypes<Pick<StoreModules, "auth">> &
  RootStoreModuleTypes<Pick<StoreModules, "root">>;
