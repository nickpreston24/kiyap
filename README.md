# KIY'APP (Kee-yahp)

A full stack web application for finding your local sensei!  Looking to get into martial arts, but don't know where to start?  Kiy'app is for you!  Kiy'app simplifies the process of finding by taking out the guesswork and trial and error in finding the right teacher!

## Built by:
* Michael Preston

## [Deployed here!](https://kiyapp.herokuapp.com/)

## Sample Login:

* Student:
  * Username: Demo Man
  * Email: kiyapp.demo@gmail.com
  * Password: demoday

## Signing Up:

![SignUp](https://github.com/MikePreston17/kiyap/blob/master/screenies/Kiyap-Sign-Up.gif)

## Search:

* To search for new schools, type into the Search Bar within the Map near the top of the page:
* Click 'Like' on Schools you want to look at later.

![Search Schools](https://github.com/MikePreston17/kiyap/blob/master/screenies/Kiyap-Search-Schools.gif)

## Deployed to:
https://kiyapp.herokuapp.com/

## To Test locally:
1. Clone Kiy'app with `git clone https://github.com/MikePreston17/kiyap.git`
2. Run `npm install` in the project folder.
3. Make sure you have MongoDB installed and `mongod` running.
4. Run `npm run start` to start the application in develop mode.

# Scripts
| Command | Description|
| --------|:----------:|
| `npm run start` | Runs the application server and react scripts using [concurrently](https://www.npmjs.com/package/concurrently)|
| `npm run clean` | Deletes any `build` & `node_modules` dirs and removes `package-lock.json`s |
| `npm run reinstall` | Runs clean script (`npm run clean`) and then reinstalls all packages |
| `npm run rebuild` | Runs clean script (`npm run clean`) and then rebuilds the app into the `/build/` directory |

## Built using:
* MERN stack (Mongo, Express, React, Node)
* Firebase (for authentication)
* HTML5, CSS3 and Javascript/ES6.
* [Create React App](https://www.npmjs.com/package/create-react-app)

## Dependencies:

### State Management
* [Mobx](https://www.npmjs.com/package/mobx)

### User Interface
* [survey-react](https://www.npmjs.com/package/survey-react)
* [material-ui](https://www.npmjs.com/package/material-ui)

### Database ORMs
* [mongoose](https://www.npmjs.com/search?q=mongoose) 
* mysql
* sequelize

### Full Stack glue
* [axios](https://www.npmjs.com/package/axios)
* [concurrently](https://www.npmjs.com/package/concurrently)
* express.js

### Other bits
* dotenv
* axios
* yup
* [react-google-maps](https://www.npmjs.com/package/react-google-maps)
