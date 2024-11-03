import { FeatureFlags } from "@/6_shared/lib/types/featureFlags";

import { UserRole } from "../consts/userConsts";

export interface User {
  id: string;
  username: string;
  avatar?: string;
  roles?: UserRole[];
  features?: FeatureFlags;
}

export interface UserSchema {
  authData?: User;
  _inited: boolean;
}
