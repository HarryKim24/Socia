export const users = [
  {
    email: "test1@mail.com",
    password: "test1234",
    name: "name1",
  },
];

export const addUser = (user) => {
  users.push(user);
};