import api from "../Api/Axios";

export const adminGuard = async (): Promise<boolean> => {
  try {
    const response = await api.get<boolean>("/admin");
    return response.data; // true ou false vindo do back
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
};
