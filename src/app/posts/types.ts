export type User = {
  name: string;
  id: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  user: User;
};
