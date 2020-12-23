# User API
## API URL
[Mern API](https://mern-api-task.herokuapp.com/api/users)

## End Points
### Get all users
[/api/users](https://mern-api-task.herokuapp.com/api/users)<br/>
__Method__ - GET<br/>
__Request body__ - {}<br/>
__Response__ - { users: []}<br/>

### User Sign Up
[/api/signup](https://mern-api-task.herokuapp.com/api/signup)<br/>
__Method__ - POST<br/>
__Request body__ - { name : String, email : String, Unique, password : String}<br/>
__Response__ - { message : String}<br/>

### User Login
[/api/login](https://mern-api-task.herokuapp.com/api/login)<br/>
__Method__ - POST<br/>
__Request body__ - { email : String, Unique, password : String}<br/>
__Response__ - { userId : String, email : String, token : String}<br/>

### User Profile
[/api/:uid](https://mern-api-task.herokuapp.com/api/)<br/>
__Method__ - GET<br/>
__Headers__ - Authorization: "Bearer token"<br/>
__Request body__ - {}<br/>


### Update password
[/api/:uid](https://mern-api-task.herokuapp.com/api/)<br/>
__Method__ - PATCH<br/>
__Headers__ - Authorization: "Bearer token"<br/>
__Request body__ - { password : String, newPassword : String}<br/>
__Response__ - { message : String}<br/>

## Modules Used
__Mongoose__ - for Schema models<br/>
__Bcrypt__ - to encrypt the passwords<br/>
__JSON Web Token__ - to generate tokens<br/>
__Dotenv__ ( development ) - to use .env varibales in node js<br/>
__Cors__ - for Cross-origin resource sharing<br/>


## Backend
<p align="left">
<a href="https://nodejs.org" target="_blank"> <img src="https://devicons.github.io/devicon/devicon.git/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="60" height="60"/> </a> &nbsp;&nbsp;
  <a href="https://expressjs.com" target="_blank"> <img src="https://devicons.github.io/devicon/devicon.git/icons/express/express-original-wordmark.svg" alt="express" width="60" height="60"/> </a>
  &nbsp;&nbsp;
  <a href="https://www.mongodb.com/" target="_blank"> <img src="https://devicons.github.io/devicon/devicon.git/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="60" height="60"/> </a>
</p>

## Deployed on
<p align="left">
<a href="https://heroku.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/>
</p>
  
## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
