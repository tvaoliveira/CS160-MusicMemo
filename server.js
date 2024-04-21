import express from 'express';
import fs from 'node:fs/promises';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Keep track of the parent directory that `server.js` resides in; we'll use this later.
const __dirname = dirname(fileURLToPath(import.meta.url));

// Try grabbing the PORT and HOST variables from the environment, or use localhost:8000 as a default.
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
const HOST = process.env.HOST ?? 'localhost';


// `app` refers to this particular server, the one we'll add behavior to.
const app = express();


// app.use() asks our server to use some **middleware**, which can intercept and handle requests
//   before our custom request handlers are invoked.
app.use(
  // The built-in `express.static` middleware directs Express to look in a particular directory
  //   (the local 'public' directory, in our case) for files requested by clients. For example,
  //   if the user visits `/a.html`, Express will look for `public/a.html` and, if the file is
  //   found, read the contents of the file and return those contents to the user.
  // This is especially useful for assets without dynamic content like images, .css, and .js files,
  //   since we can add them to our project folder and use them without having to ask the server
  //   explicitly to serve each new file we add.
  // Note that `express.static` will send the contents of `index.html` if no path is specified
  //   (i.e. http://localhost:8000/), as is standard. You can configure this if you'd like:
  //   https://expressjs.com/en/4x/api.html#express.static
  express.static('public/'),
);

// That said, we don't *need* to have a file in the filesystem for every route on the server.
//   In this case, we construct a response and send it straight to the client without ever reading
//   from a file. The `.html` extension here is deceptive; there is no real hello-world.html file
//   on the server.
// You can try this by visiting http://localhost:8000/hello-world.html in your browser. Try changing
//   the response text in this server code (but make sure to restart the server first)!
app.get('/hello-world.html', (request, response) => {
  response.status(200).send('Hello, world!');
});

// We can dynamically generate a response, if we'd like, rather than sending the same thing
//   every time. Try visiting http://localhost:8000/random a few times in your browser.
// The "200" status code, by the way, just tells the browser that everything went
//   fine (you can compare this to 404 or 500, which are error codes). A list of status codes
//   is available at https://http.cat/.
app.get('/random', (request, response) => {
  response.status(200).send(Math.random().toString());
});

// When we receive a request, we can decide what to respond based on details about the request.
//   In this case, we're using an Express syntax to fetch parameters from the URL.
// Try visiting http://localhost:8000/add/12/34 -- now we have an *infinite* number of routes,
//   even though there's no actual underlying HTML file being served to the user.
app.get('/add/:first/:second', (request, response) => {
  const a = parseInt(request.params.first, 10); // Grab the param called "first" and convert to an int
  const b = parseInt(request.params.second, 10); // The second argument to parseInt parses in base-10

  const sum = a + b;

  response.status(200).send(sum.toString());
});


// We can also define our own custom routes for actual files on the filesystem.
//   This route handler is marked `async`, so we can use the `await` keyword to wait for a
//   filesystem operation before responding to the user.
// Try visiting http://localhost:8000/a rather than http://localhost:8000/a.html -- you'll notice that
//   it works just the same!
app.get('/login', (request, response) => {
  response.status(200).sendFile('public/login.html', { root: __dirname });
});

app.get('/signUp', (request, response) => {
  response.status(200).sendFile('public/signUp.html', { root: __dirname });
});

app.get('/gallery', (request, response) => {
    response.status(200).sendFile('public/gallery.html', { root: __dirname });
});

app.get('/chatbot', (request, response) => {
  response.status(200).sendFile('public/chatbot.html', { root: __dirname });
});

app.get('/index', (request, response) => {
  response.status(200).sendFile('public/', { root: __dirname });
});

// Now, we can access our HTML using these more convenient `/a`, `/b`, and `/c` routes.


// Finally, we tell this server to listen for new requests. This line is what makes the Node process
//   run indefinitely, waiting for HTTP requests and responding as we defined above.
app.listen(PORT, HOST, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
});