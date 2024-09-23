import express from 'express';
import { Post, Comment } from '../models/models';

export const getPostsByCategory = (category: string) => {
  return posts.find((p) => p.category === category);
};

export const getPostsById = (id: string) => {
  return posts.find((p) => p.id === id);
};

const router = express.Router();

// Initialize categories array to save data in memory
const posts: Post[] = [];
const comments: Comment[] = [];

// Get all posts
router.get('/', (req, res) => {
  // Return all the categories with a 200 status code
  res.status(200).json(posts);
});

router.get('/category/:category', (req, res) => {
  // Retrieve the category from the route params
  const { category } = req.params;

  if (!category) {
    // If the user doesn't specify a category, return a 400 status code with a message
    return res.status(400).json({ message: 'Category is required' });
  }

  const posts = getPostsByCategory(category);

  if (!posts) {
    // If we don't find any posts, return a 404 status code with a message
    return res.status(404).json({ message: 'No posts found' });
  }

  //Return an array of all the posts by category with status code 200
  res.status(200).json(posts);
});

router.get('/:id', (req, res) => {
  // Retrieve the id from the route params
  const { id } = req.params;

  if (!id) {
    // If the user doesn't specify an ID, return a 400 status code with a message
    return res.status(400).json({ message: 'ID is required' });
  }

  const posts = getPostsById(id);

  if (!posts) {
    // If we don't find any posts, return a 404 status code with a message
    return res.status(404).json({ message: 'No posts found' });
  }

  //Return an array of all the posts by category with status code 200
  res.status(200).json(posts);
});

router.post('/', (req, res) => {
  // Retrieve the post information from the request body
  const { title, image, description, category } = req.body;

  if (!title || !image || !description || !category) {
    // If name is empty or undefined return a 400 status code with a message
    return res.status(400).json({ message: 'Missing fields.' });
  }

  // Generate a new post
  const newPost = {
    id: Date.now().toString(), // Convert id to string to match the value in get by id endpoint
    title: title,
    image: image,
    description: description,
    category: category,
    comments: []
  };
  // Add the new post to our array
  posts.push(newPost);

  // Return the created post with a 201 status code
  res.status(201).json(newPost);
})

router.post('/:id/comments', (req, res) => {
  // Retrieve the name from the request body
  const { id } = req.params;
  const { author, content } = req.body;

  if (!author || !content) {
    // If name is empty or undefined return a 400 status code with a message
    return res.status(400).json({ message: 'Missing fields.' });
  }

  const post = getPostsById(id);

  if (!post) {
    // If we don't find any posts, return a 404 status code with a message
    return res.status(404).json({ message: 'No post found' });
  }

  // Generate a new post
  const newComment = {
    id: Date.now().toString(), // Convert id to string to match the value in get by id endpoint
    author: author,
    content: content
  };

  // Add the new post to our array
  comments.push(newComment);

  post.comments.push(newComment.id)

  // Return the created post with a 201 status code
  res.status(201).json(newComment);
});

router.patch('/:id', (req, res) => {
  // Retrieve the id from the route params
  const { id } = req.params;
  // Retrieve the index of the post in the array
  const postIndex = posts.findIndex((p) => p.id === id);

  // "findIndex" will return -1 if there is no match
  if (postIndex === -1) {
    // If we don't find the post return a 404 status code with a message
    return res.status(404).json({ message: 'Post not found' });
  }

  // Generate a copy of our cateogory
  const updatedPost = { ...posts[postIndex] };
  // Retrieve the name from the request body
  const { title, image, description, category } = req.body;

  // Check if we have a name, if so update the property
  if (title) {
    updatedPost.title = title;
  }
  if (image) {
    updatedPost.image = image;
  }
  if (description) {
    updatedPost.description = description;
  }
  if (category) {
    updatedPost.category = category;
  }

  // Update the post in our array
  posts[postIndex] = updatedPost;

  // Return the updated post with a 200 status code
  res.status(200).json(updatedPost);
});

router.delete('/:id', (req, res) => {
  // Retrieve the id from the route params
  const { id } = req.params;
  // Retrieve the index of the post in the array
  const postIndex = posts.findIndex((p) => p.id === id);

  // "findIndex" will return -1 if there is no match
  if (postIndex === -1) {
    // If we don't find the post return a 404 status code with a message
    return res.status(404).json({ message: 'Post not found' });
  }

  // Remove the post from the array
  posts.splice(postIndex, 1);

  // Return a 204 status code
  res.status(204).send();
});

export default router;
