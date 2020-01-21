# Pre requisite
typescript


to start the dev server run : 

Start a redis server. The job queue depends on it. 
`docker run -d -p 6379:6379 --name tattle-job-queue redis`
`npm run start-dev`


# Production
Start a redis server. The job queue depends on it. 
`docker run -d -p 6379:6379 --name tattle-job-queue redis`

`npm run build`
`forever start build/index.js`


# Convention
We use camelCase for variables within the code
for parameter names coming from APIs
for column names in sql db

..
