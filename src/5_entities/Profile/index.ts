export { Profile, ProfileSchema } from "./model/types/profile";

export { profileActions, profileReducer } from "./model/slice/profileSlice";
export { default as fetchProfileData } from "./model/services/fetchProfileData/fetchProfileData";
export { default as ProfileCard } from "./ui/ProfileCard.tsx/ProfileCard";
