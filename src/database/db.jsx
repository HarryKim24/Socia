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

export const posts = [
  {
    author: 'name1',
    content: 'content1',
    createdAt: (function() {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 1);
      return date.toISOString();
    })(),
  },
];

export const addPost = (post) => {
  posts.push(post);
};

