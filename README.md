# Home-Automation

Home Automation system to remotely control devices at home

### Please find the important information regarding Application.

1. Technology stack - Node JS, Javascript, Express.
2. DataBase - MongoDB, Mongoose (ORM).
3. Tools/NPM Modules - Commander, inquirer.

Project Github Link - https://github.com/shailus1029/Home-Automation

### Requirements for running the project successfully -

1.  Node should be installed on system and version should be greater than 10.15.3
2.  MongoDB database should be installed

### Steps to run the project.

1.  Clone the repository from the github link
2.  Go to the root folder of the project using command `cd Home-Automation/`.
3.  Check node version using `node -v`
4.  Make sure node version should be greater than 10.15.3
5.  Create a database named “home-automation” in the mongoDB.
6.  Run `npm install` command in the root folder.
7.  Run `npm link` command in the root folder.

###### After running the above 7 steps we can run the application in two ways.

1. Using Node server REST API through Postman
2. Using a web console (Node CLI for application).

###### Running application through node server - Go to the root folder and run `npm start` command. Node server will be running on port 8000.

You can find out the api postman collection json file in the code named as “Home Automation.postman_collection.json”. Import this json file in the postman and then you can access all RESTful APIs.

###### Running application through web console - Go to the terminal and run command `device-system --help`. It will list all the commands through which one can control and manage the system.

## Scenarios -

Below are the following scenarios I have implemented. You can test them from a postman and as well as from a web console.

1.  List all active smart devices
2.  List all inactive smart devices
3.  Add a smart device.
4.  Update a smart device details
5.  Remove a smart device.
6.  Change status of a device from active to inactive and vice versa.

### Postman API details.

##### 1. List all active smart devices

![alt-text](https://github.com/shailus1029/Home-Automation/blob/master/API-1.png?raw=true)

##### 2. List all inactive smart devices

![alt-text](https://github.com/shailus1029/Home-Automation/blob/master/API-2.png?raw=true)

##### 3. Add a smart device.

![alt-text](https://github.com/shailus1029/Home-Automation/blob/master/API-3.png?raw=true)

##### 4. Update a smart device details.

![alt-text](https://github.com/shailus1029/Home-Automation/blob/master/API-4.png?raw=true)

##### 5. Remove a smart device.

![alt-text](https://github.com/shailus1029/Home-Automation/blob/master/API-5.png?raw=true)

##### 6. Change status of a device from active to inactive and vice versa.

![alt-text](https://github.com/shailus1029/Home-Automation/blob/master/API-6.png?raw=true)
