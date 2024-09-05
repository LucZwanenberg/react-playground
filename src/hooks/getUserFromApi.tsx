import { User } from "./useAuth";

export const getUserFromApi = (): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        type: "user",
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
      });
    }, 2000);
  });
};
