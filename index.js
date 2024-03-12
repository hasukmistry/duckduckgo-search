import app from './app/index.js';

if (process.env.NODE_ENV === 'development') {
  const port = process.env.PORT || 3000;

  // Start the server
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${port}`);
  });
}

// We need to export our app from the file instead of starting the server with app.listen().
// So, Express.js application will work as a serverless function with Vercel.
// Vercel will handle the server part for us.
export default app;
