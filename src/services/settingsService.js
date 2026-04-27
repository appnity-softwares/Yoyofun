import { apiRequest } from "./api";

export const settingsService = {
  public() {
    return apiRequest("/settings/public");
  },
};
