MERN Stack Webserver by Riley Harlan Kippes

This site is going to be a writing site, allowing users to write and share stories.

Current features include being able to register, log in, log out, and view your personal account.
You can also chat on the chat box, and send direct messages to each other. There's also an
engine displacement calculator that uses 1-way data binding. As for stories, you can post and read 
stories, they are limited to a single page though.

Being pretty was not a concern, function was.

To Build, run "npm run build"

To Run, run "npm start"

To Clean, run "npm run clean"

To Test, run "npm test"

MongoDB, Express, ReactJS, NodeJS

~~ File Structure ~~

~ contains the base files. readme, server.js

/public contains public files like client-side .js files

/routes contains individual pages

/jsx_src contains jsx source code, to be compiled with babel

/ts_src contains typescript source code, to be compiled with tsc

/views contains html templates

/static contains static files, namely style.css

-- Future features ideas to be implemented --

Add the ability to delete accounts. I need to add this before go live, for gpdr stuff.

Maybe some sort of blog posting system, a bit like twitter. 

Possibly some sort of small game, like Breakout or Pong. I would also implement a leaderboard for it, and attach it to the user accounts
