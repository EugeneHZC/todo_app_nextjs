export type Todo = {
  _id: string;
  description: string;
  doneState: boolean;
  creator: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};
