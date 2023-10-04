## Table of Contents

- [Task Walkthrough](#task-walkthrough)
- [Problem Set I - Regex](#problem-set-i-regex)
- [Problem Set 2 - Functional web app](#problem-set-2-functional-web-app)
  1. [Part A](#part-a)
     - [Overview](#overview)
     - [Installation on AWS EC2](#installation-on-aws-ec2)
     - [Automating Deployment(CI/CD)](#automating-deploymentcicd)
     - [API Reference](#api-reference)
     - [Running the application locally](#running-the-application-locally)
  2. [Part B](#part-b)
     - Main Google Script can be found [here](https://gitlab.com/glaucusec/nextlabs/-/blob/main/GoogleAppScript.js)
- [Problem Set 3](#problem-set-3)

### Task Walkthrough

- A complete walkthrough of this task is available as a video [Google Drive](https://drive.google.com/drive/folders/1fbO41OhAomnJPmlouCe9DuOdL18R7YFd?usp=drive_link) or [Youtube](https://youtu.be/1T_V91yOLKs)

## Problem Set I - Regex

- The text which needs to be extracted are the values of the json object. If we observe carefully only the keys we have are `id` and `code`.
- Give below is the regex to find matches and converting them to Array

  ```javascript
  let pattern = /("id"|"code"):(\d+)/g;
  let output = [];
  let matches = jsonString.match(pattern);
  for (let m of matches) {
    let number = m.match(/\d+/)[0];
    output.push(number);
  }

  console.log(output);
  ```

## Problem Set 2 - Functional web app

### Part A

### Overview

- Visit [http://34.230.193.181/](http://34.230.193.181/) to view the application.
- Technologies Used: **NodeJS**, **ExpressJS**, **MySQL**, **Sequelize**, **Puppeteer**, **ReactJS**, **Axios**, **Nginx**, **Jenkins** etc..
- Server running on **AWS EC2** instance @ Ip 34.230.193.181/ port 3000.
- Used **Nginx** as the **reverse proxy** to redirect the traffic Internally.
- MYSQL Server running on **Amazon RDS** database-1.c5hlysjb44mm.us-east-1.rds.amazonaws.com @ port 3306

`NOTE` The script for scraping the category of the app from the playstore - every 24 hours is [here](https://gitlab.com/glaucusec/nextlabs/-/blob/main/server/worker/dailyWorker.js?ref_type=heads)

**Database Relationships**

- We have 3 table, `Task`, `User` and `CompletedTask`. Only `admin` use can add Task.
- User can have many CompletedTask; In sequelize we define the following
- `User.hasMany(CompletedTask)`
- `CompletedTask.belongsTo(User)`

**Application Functionalites**

A. Admin Facing

- Admin user can add android app as well as the number of points - earned by user for downloading the app
- Goto [http://34.230.193.181/](http://34.230.193.181/) and click on `Admin Login` to login as Admin

B. User Facing

- User can see the apps added by the admin and the points
- He / She can completed the Tasks and earn points
- Goto [http://34.230.193.181/](http://34.230.193.181/) and click on `User Login` to login as User

### Installation on AWS EC2

Following are the steps for installing the application on AWS.

**Basic**

- Create a new EC2 Instance ( with inboud rules on PORT 80, 8080, 22, 3000)
- Installing the required services: NodeJS, Jenkins, Nginx etc..
- Clone the project and `npm install` on client and server.
- Build the frontend react app using `npm run build`.
- Copy the build folder to `/var/www/`

**Setting up Ngnix**

We will serve the frontend at `/` and will redirect the traffic coming to port 3000 to `http://localhost:3000`

- Edit `/etc/nginx/sites-available/default` and change `root /var/www/html` to `root /var/www/dist`
- Add the following lines

  ```
  location /api {
    proxy_pass http://localhost:3000;
  }
  ```

### Automating Deployment(CI/CD)

Create a new branch called `deployments` for only deploying the application. Push the code to this branch

- Install Jenkins and Check if jenkins is running via `sudo systemctl status jenkins`
- Make sure you have the .env file in the folder `/home/ubuntu/envFolders`
- Open [http://34.230.193.181:8080](http://34.230.193.181:8080) and login.
- Add Gitlab credentials in `Credentials` section.
- Create a new Job with a suitable name
- Add the git repo url and select the `deployments` branch
- Add the following build steps
  ```shell
  sudo pm2 stop all
  cd server/
  npm install
  sudo cp /home/ubuntu/envFolders/.env /var/lib/jenkins/workspace/test/server
  sudo pm2 start app.js
  ```
- Also select a `Poll SCM` and add a cron expression for automatic deployments
- Save the Job.

### API Reference

- For a comprehensive API reference, please visit this [link](https://gitlab.com/glaucusec/nextlabs/-/blob/main/documentation/API_REFERENCE.md).
- All **user** endpoints are accessible as an API.
- By default, API endpoints require an `authentication token` either in the Cookies or the Authorization Header as `Bearer <token>`.
- If a token is provided in both the Cookies and the Authorization Header, the token from the Authorization Header takes precedence.

### Running the application locally

- For complete local Installation steps visit [here](https://gitlab.com/glaucusec/nextlabs/-/blob/main/documentation/INSTALLATION.md)

`NOTE`:
I have tried using RabbitMQ and was unsuccessful to use it; but have documented what I learned and what went wrong [here](https://gitlab.com/glaucusec/nextlabs/-/blob/main/RABBITMQ.md)

---

### Part B

- The main script can be found [here](https://gitlab.com/glaucusec/nextlabs/-/blob/main/GoogleAppScript.js).
- This script extracts the App ID from the spreadsheet and sends a request to retrieve the App Details. It subsequently populates the appropriate columns in the spreadsheet with the obtained data.

## Problem Set 3

When it comes to scheduling certain tasks, cron jobs are the first method that comes to my mind and that's what I used in this project for a similar task which is periodically fetching and updating the database. I tried to implement RabbitMQ and celery for the same, but failed. I will provide what I understood below

#### Limitations

- Cron Jobs are suitable for small tasks that don't have complexity.
- Cron jobs may not be the best for complex tasks and application which require logging.

#### Recommendations

- For more complex and more resource intensive tasks, we can use RabbitMQ, celery and other similar tools. They have the ability to provide better scaling and handling errors.
- A message broker like RabbitMQ will help us to put the scheduled tasks in a queue and a tool like celery will help us to execute those tasks / messages.
- It will also help us to distribute the tasks for as many workers as needed.

#### Scaling

- While working with the features of the Web App, I came to know about AWS lambda, in which we can run just the code and stop worrying about anything else.
- That will be a valuable option for better scalability

---
