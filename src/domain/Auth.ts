export type User = {
  name: string;
  email: string;
}
export type Auth = {
  type: "user"; user: User;
} |
{ type: "loading" } |
{ type: "guest" };
