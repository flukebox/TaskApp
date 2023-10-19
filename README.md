# TaskApp
A simple nodeJs, react, mongoDB app to manage tasks

We will using NodeJs, Typescript, ExpressJS, Mongoose(MongoDB) in this app.

We have two part of the app, expressjs base backend and react based frontend.
## tasksAPI (Backend)
`tasksAPI` folder contains code for tasks backend api.

## tasksAPP (Frontend)
`tasksAPP` folder contains code for tasks frontend app.

# BEFORE YOU RUN
Please make sure you have mongodb installed.
Install all project dependencies with node command.
`npm install --include dev`

## HOW TO RUN
We need to first start the backend service and then start the frontend app

### Backend API -- Test Environment
How to run backend API for TaskAPP ?
Below command will run this app in dev enviroment with hot reload.
`npm run dev`.

### Backend API -- Prod Environment
Please first build the code with `npm run build`.
Then run the produciton code in dist with `npm run prod`.

### FrontEnd UI 
How to run UI APP for TaskAPP ?
