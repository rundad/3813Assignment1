# Assignment1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.2.

## Git

During the development of the project, all my files are stored in a git repository called 3813Assignment. And the organisation of the repository is GitHub which provides hosting for software development version control using git. This repository is just created for storing my project and version control. Git is a free and open source distributed version control system. So I used git for the version control of the project, if the application is crashed due to various reasons, I can revert it back to the previous version then I still have my project. And if your project files are lost, you can still get the files back by using git. The features that I have used during my project development are just storing the files to the repository by using git command "git add", "git commit" and "git push". "git add" command to add the files to the stage, "git commit" to commit the change, and "git push" to push the files to the remote repository which is the repository on Git Hub. I didn't use features like revert or something like that because the devevelopment progress was quite successful, no crashes occured. 

## Angular Architecture

In Angular, components control a patch of screen called a view. The components application logic is defined inside a class. The class interacts with the view through an API of properties and methods. Component handles tasks like; creates and display HTML and CSS for the component, handles any events that occur within the component and manages any data that might be displayed or entered into the component. In the project, the components I have created are channels, groups, users, profile and login. The channels component is for displaying the channels within the group and handles any actions and events for the channels, the groups component is to display the the groups and handles other actions of events for the groups, users component display all the users and handles any actions or events for the users, login component display the form for user login and handles login function and profile component display the logged in user details. Services provide re-useable functionalities that are independent of the view. There are two services in the project, the first service is data sharing service and the second one is route service. The data sharing service is to share the data status around the components and the route service is to provide http routing requests service around the components. In Angular, routes allow the web application to have a table, matching routes to components. Routes tell the router which view to display when a user clicks a link or pastes a URL into the browser address bar. An angular route can be created with a path and a component in app-routing-module.ts file. The routes I have in the project are: login, groups, profile, users and channels. The login route will take the user to the login component, groups route will take the user to the groups component, users route will take the user to the users component, profile route will take the user to the profile component and channels route will take the user to the channels component.

## REST API

In the project, I used http request to access the routes at the server side to get the details I want, to create items and delete items. The http method I have used are get and post, all the routes in the project used these two http method. And the routes that the project has are:

1. login route - post request route
    Parameters: email - string; the email is the only paramter that the route will take and it is also the data that will sent to the servide in the request body. The value of the paremater is the value the user have entered in the login form
    Return value: The login route will return a user object depends on whos the user have logged in
    Purpose: To check that is the user exist in the data by checking the email is exist in server side. If the email does exist, send the user object back to client side with a valid property of value true, if the email does not exist, send the user object back to client side but the valid property of value false.

2. getUsers route - get request route
    Parameters: This route does not have parameters
    Return Value: This route returns all the user objects in the data
    Purpose: To get all the users details and display them on the page

3. createUser route -post request route
    Parameter: username - string, email - string, the value of parameters are get from the values that the user have entered in the create user form
    Return Value: This route returns a boolean, if the username is already exist, return false to the client side, if the username and email does not exist, created a new user object in the data and return true to client side
    Purpose: To create a new user by using the details in the form

4. removeUser route - post request route
    Parameter: username - string; used to determine which user to be removed
    Return Value: This route returns a boolean value, if the user in remove action is a super admin, return false because they cannot be deleted and if a user is not a super admin, remove the user
    Purpose: To remove a user from the data

5. getGroups route - get request route
    Parameter: This route does not have parameters
    Return Value: This routes returns the groups details that the user have control with, if the user is a super admin returns all the groups
    Purpose: To get the details of the groups and display them on the page

6. createGroup route - post request route
    Parameter: name - string, username - string; the name parameter is the name of the group that the user want to create and the username is the name of the user who created the group
    Return Value: This route returns a boolean value, if the group already exist return false, and if the group does not exist, create the group and return true
    Purpose: To create a new group

7. removeGroup route - post request route
    Parameter: name - string; the name of the group that is going to be removed
    Return Value: This route returns a boolean value of true
    Purpose: To remove a group in data

8. createChannel route - post request route
    Parameter: group - string, channel - string; group is the name of the group that the channel want to be created in, and channel is the name of the channel that the user want to create. 
    Return Value: This route returns a boolean value, if the channel is already exist in the group, return false, if the channel does not exist in the group return true.
    Purpose: To create a new channel in the group

9. getChannel route - post request route
    Parameter: group - string; the name of the group
    Return Value: This route returns an array of channels that in the group
    Purpose: To get the channels in the group

10. removeChannel route - post request route
    Parameter: group - string, channel - string; group is the name of the group that the channel belongs to and the channel is the name of the channel
    Return Value: This route returns a boolean value of true
    Purpose: To remove a channel in a group

11. getCurrentUser route - get request route
    Parameter: This route does not have parameters
    Return Value: This route returns a user object depends on whos the user have logged in
    Purpose: To get the details of the logged in user

12. inviteUser route - post request route
    Parameter: group - string, username - string; the group is the name of the group that the user want to invite user to, and the username is the name of the user
    Return Value: This route return a boolean value, return false if the user already in the group, return true if the user does not in the group
    Purpose: To invite a user to a group

13. getGroupUsers route - post request route
    Parameter: group - string; the name of the group
    Return Value: This route returns an array of user objects that in the group
    Purpose: To all the users that in the group

14. kickUser route - post request route
    Parameter: group: string, username - string; group is the group that the user is in and the username is the name of the user who is going to be removed from the group
    Return Value: This route returns a boolean value of true
    Purpose: To kick a user out of the group

15. gGroupUsers route - post request route
    Parameter: group: string
    Return Value: This route returns a list of user objects that in the group
    Purpose: To get all the user details of the users who in the group

16. getGroupChannel route - post request route
    Parameter: group - string; the name of the group
    Return Value: This route returns a list of channels that in the group
    Purpose: To get all the channels in the group

17. addUserChannel route - post request route
    Parameter: group - string, username - string, channel - string; group is the name of the group, username is the name of the user and the channel is the name of the channel
    Return Value: This route returns a boolean value, return false if the user already in the channel of the group, else return true
    Purpose: To invite a user into the channel of the group

18. getChannelUsers route - post request route
    Parameter: group - string, channel - string; group is the name of the group and the channel is the name of the channel
    Return Value: This route returns a list of users that in the channel of the group
    Purpose: To get all the users that in the selected channel in the selected group

19. rmUserFromChannel route - post request route
    Parameter: group - string, username: string, channel - string; group is the name of the group that the remove action is going occured in, the username if the user who will be going to be removed from the channel and the channel is the channel that the user is going to removed off
    Return Value: This route returns a boolean value of true
    Purpose: To remove a user from a channel

21. createWithSuper route - post request route
    Parameter: username - string, email - string, role - string; the value username, email and role are get from the create user form which entered by admins. 
    Return Value: This route returns a boolean value, return true if the user does not already exist in the data, else return false
    Purpose: To create a user with different roles

22. giveAssis route - post request route
    Parameter: group - string, username - string; group is the name of the group and username is the name of the user
    Return Value: This route returns a boolean value, return false is the user is a super or a group admin so we cannot provide them group assis role, else return true 
    Purpose: To provide a user in the group Group Assis role

23. giveSuper route - post request route
    Parameter: name - string; the username of the user
    Return Value: This route returns a boolean value, returns true if the user is not a super admin, else returns false
    Purpose: To provied a user super admin role

24. getChannels route - post request route
    Parameter: group - string; the name of the group
    Return Value: This route returns a list of channel objects of the group
    Purpose: To get all the channels details of the group by getting the channel objects in server side

25. getUserGroups route - get request route
    Parameter: This route does not have parameters
    Return Value: This route returns a list of groups that the user belongs to
    Purpose: To get all the groups that the user have joined

26. getUserGroupChannels route - post request route
    Parameter: group - string; the name of the group
    Return Value: This route returns a list of channels of the group that the user joined
    Purpose: To get all the user's channels of the group

## Data Structure

The overall data structure that used in both the client and server sides are divided into three properties. They are users, groups and channels. Each property has an array of objects. In users, the object of users has properties of username, email, password, role, groups, valid and adminGroupList. The groups in users object has an array of group object as the value. And each group object has property of the name of the group and the channels of the group. The groupAdminList has an array of group names as value, and this array stores the groups that the user have created. For the Groups property in the data structure, it has an array of group objects. Each group object has property of the name of the group, the channels in the group, group admin, group assis and users. Except for the name of the group is type string, all other properties are type array. Channels in the group stores a list of channles that belongs to the group, the group admin stores the people who created the group and people who have control to the group. Group assis is an array that stores the people who have control to the channels in the group. And users is an array that stores the users that are in the group. The last property in the data structure is Channels, Channels has an array of channel object. Each channel object has property of the name of the channel, the name of the group that the channel belongs to and users. The name of the channel and the name of the group is type string and only users is an array which stores the name of users that in the channel. 

## Stage Change

There is only one global variable in server side which is user. This user variable will be changes when the user have logged in, and the login/auth route will get the username from the client side and store it into the user variable. So when a user logged in, the variable will be changed. And the data for users, groups and channels are all stored in a JSON format file. And it is also the only file will be changed when requests are sent from the client side. The data is store in a file called data.json, and the data will be read when a request is sent to an valid endpoint. The data is read by using fs module and the method for reading the file data will be fs.readFileSync, and store the data into a variable. When the request has goes to the final stage which have finish the functionalities for the request, if the data from the file have changed, then the data will be write back to the file using writeFile method. The display of each angular component will be updated whenever there is an action occured, for example, a user logged in, then the page will be updated to the profile component, or when the admin creates a user, the component will be updated because of the ngOnInit function in each of the component ts file and the display of data in the page will be updated and the component page will also be updated. 

## Responsibilities between client and server

In the application, I have used angular for the front end of the application and used node for the server for the application. The front end, the client side is responsible to send the data that entered by the user and send the data to the server side using either get or post http request. All the functions for sending requests to the server side will be defined in a service. The component in client side called the function in the service and when the function is called, the request will be send to the server side with the request data (if there is any data need to send with the request). The data that send with the request will be stored in the request body, and in server side, the data can be access and take out by access to the request body. When the request is sent to the server, the server side detects the request endpoint to see is the endpoint valid or not. If the endpoint is valid, run the actions that defined in the route and send data back to the client side. In general, the client side is more likely handles the display of data and other actions depends on the data that sent back from the server side. And server side is more likely handles the actions to the data. 

## Node server architecture

A module encapsulated related code into a single unit of code and creating a module is likened to moving all related functions into a singel file. i have created two modules myself and used in the project, one of the modules has all the routes and one of the module is for listening to port. Other modules I have used in the project are express, cors, http, path and bodyParser module. The express module is used for routing, http module used to provide http functionality, bodyParser used to create an instance of body-parser and to parse JSON data, and cors used for enable all cors requests for all origins. There are only four files in server side, server.js for the server, api-login.js for the routes, listen.js for listening to port and data.json for storing data for the project. Server side only has one global variable which is defined in data.json file called user.

