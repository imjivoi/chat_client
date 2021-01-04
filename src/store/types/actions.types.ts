import { ActionTypes as chatTypes } from "../modules/chat/actions.types";
import { ActionTypes as authTypes } from "../modules/auth/actions.type";
export const AllActionTypes = { ...authTypes, ...chatTypes };
