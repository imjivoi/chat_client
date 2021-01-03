import { IRootState } from "@/store/interfaces/root";
import { IUserData } from "@/store/interfaces/user";
import { GetterTree } from "vuex";
import { AuthGettersTypes } from "./getters.types";

export const getters: GetterTree<IUserData, IRootState> & AuthGettersTypes = {};
