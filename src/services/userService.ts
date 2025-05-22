import { api } from "@/lib/api";
import { UserProfile, UserUpdate } from "@/types/user.types";

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const response = await api.get("/users/profile");
    return response.data;
  },

  async updateProfile(data: UserUpdate): Promise<UserProfile> {
    const response = await api.put("/users/profile", data);
    return response.data;
  },

  async deleteProfile(): Promise<void> {
    await api.delete("/users/profile");
  },
};
