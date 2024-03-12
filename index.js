import app from './app/index.js';

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});
