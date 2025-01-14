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
    id: 1,
    authorId: 1,
    author: 'HarryKim',
    title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    content: 'Etiam erat felis, accumsan et lacus vitae, ornare fermentum nisl. Vestibulum molestie ante sed nulla tincidunt vestibulum varius suscipit quam. Nunc gravida pharetra felis sed volutpat. Morbi id sagittis urna. Cras malesuada molestie justo, eget vulputate justo fermentum a. Morbi faucibus maximus nunc, varius ornare tellus dapibus at. Sed pharetra, urna id volutpat finibus, lacus felis scelerisque dui, id blandit mauris nunc quis sapien. Mauris in bibendum ex. Maecenas non porttitor odio, ut facilisis justo. Aenean tempor a nibh sit amet lacinia. Pellentesque dignissim tincidunt vestibulum. Phasellus vel mi quis nunc pharetra aliquam quis vel justo. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    createdAt: (function() {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 1);
      return date.toISOString();
    })(),
    likes: 10,
  },
];

export const addPost = (post) => {
  posts.push(post);
};