export const users = [
  {
    id: 1,
    email: "test1@mail.com",
    password: "test1234",
    name: "name1",
  },
];

export const addUser = (user) => {
  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  const userWithId = { ...user, id: newId };
  users.push(userWithId);
};

export const posts = [
  {
    author: 'HarryKim',
    title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    content: 'Etiam erat felis, accumsan et lacus vitae, ornare fermentum nisl. Vestibulum molestie ante sed nulla tincidunt vestibulum varius suscipit quam. Nunc gravida pharetra felis sed volutpat. Morbi id sagittis urna. Cras malesuada molestie justo, eget vulputate justo fermentum a. Morbi faucibus maximus nunc, varius ornare tellus dapibus at. Sed pharetra, urna id volutpat finibus, lacus felis scelerisque dui, id blandit mauris nunc quis sapien. Mauris in bibendum ex. Maecenas non porttitor odio, ut facilisis justo. Aenean tempor a nibh sit amet lacinia. Pellentesque dignissim tincidunt vestibulum. Phasellus vel mi quis nunc pharetra aliquam quis vel justo.',
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

