import { MutationTypes as friendsTypes } from "../modules/friends/mutations.types";
import { MutationTypes as chatTypes } from "../modules/chat/mutatios.types";
import { MutationTypes as authTypes } from "../modules/auth/mutations.types";

export const AllMutationTypes = { ...authTypes, ...chatTypes, ...friendsTypes };
