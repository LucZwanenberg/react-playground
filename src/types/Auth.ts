export interface User {
  type: "user";
  name: string;
  email: string;
}

export interface Guest {
  type: "guest";
}

export type AuthEntity = User | Guest;
