module.exports = function(app, path){
    var fs = require('fs');

    // var data = {
    //     users: [
    //         {
    //             username: "super",
    //             email: "super@com.au",
    //             password: "abc",
    //             role: "Super",
    //             groups: [],
    //             valid: false
    //         }
    //     ]
    // }

    console.log("hello")
    //The login user
    var user = ""
    //request endpoint for checking user is exist or not
    app.post('/api/auth', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }

        //read file data
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)

        //create a customer object and give properties to the object
        var customer = {}
        customer.username = ""
        customer.email = ""
        customer.password = ""
        customer.groups = []
        customer.role = ""
        customer.adminGroupList = []
        customer.valid = false
        //customer.channel = []

        //use for loop to check is the email exist in the data, if exist assign data to customer object and send back to client side
        for(i = 0; i <data.users.length; i++){
            if(req.body.email === data.users[i].email){
                customer.username = data.users[i].username
                customer.email = data.users[i].email
                customer.password = data.users[i].password
                customer.groups = data.users[i].groups
                customer.role = data.users[i].role
                customer.adminGroupList = data.users[i].adminGroupList
                customer.valid = true
                
                user = data.users[i].username
                console.log(user)
                //res.send(customer);
            }
        }
        // for(i = 0; i <data.Groups.length; i++){
        //     if(customer.groups[i] === data.Groups[i].name){
        //         customer.channel.push({"name:": data.Groups[i].name, "channels": data.Groups[i].channels})
        //         //res.send(customer);
        //     }
        // }
        res.send(customer);
    })

    //request endpoint for getting users
    app.get('/getUsers', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        //read file data
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        
        //send data back to client side
        res.send(data.users);
    })

    //request endpoint for creating user
    app.post('/createUser', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }

        //read file data
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        var usernames = []
        var emails = []

        //get the usernames and emails from the data and store them into arrays
        for(i = 0; i <data.users.length; i++){
            usernames.push(data.users[i].username)
            emails.push(data.users[i].email)
        }
        console.log(usernames)

        //create a customer object
        var customer = {}
        customer.username = ""
        customer.email = ""
        customer.password = ""
        customer.groups = []
        customer.role = ""
        customer.adminGroupList = []
        customer.valid = false

        //if the requested username and email are not exist, create user by pushing the customer object into data, else send false back to client side
        if(usernames.indexOf(req.body.username) == -1 && emails.indexOf(req.body.email) == -1){
            customer.username = req.body.username
            customer.email = req.body.email
            customer.password = ""
            customer.groups = []
            customer.role = "user"
            customer.adminGroupList = []
            customer.valid = false
            data.users.push(customer)
            res.send(true)
        }else{
            res.send(false)
        }

        //update the data file by writing the data back to the file 
        var JSON_data = JSON.stringify(data)
        fs.writeFile("data.json", JSON_data, function(err){
            if(err)
                console.log(err);
            else
                console.log("Write operation complete")
        });
        

    })

    //request endpoint for removing user
    app.post('/removeUser', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        
        //read file data
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        //an array for storing usernames
        var usernames = []
        //an array for storing emails
        var emails = []

        //get usernames and emails from the data
        for(i = 0; i <data.users.length; i++){
            usernames.push(data.users[i].username)
            emails.push(data.users[i].email)
        }

        //use for loop to check if the user is a super admin or not, if the user is super admin send false back to client side and if the user is not a super admin, send true back to client side and remove the user from the data
        for(i = 0; i <data.users.length; i++){
            if(req.body.username === data.users[i].username){
                if(data.users[i].role === "Super"){
                    res.send(false)
                }else{
                    data.users.splice(i, 1)
                    res.send(true)
                }
 
            }

        }

        //remove user from group admin array
        for(i = 0; i<data.Groups.length; i++){
            for(j = 0; j<data.Groups[i].group_admin.length; j++){
                if(req.body.username === data.Groups[i].group_admin[j]){
                    data.Groups[i].group_admin.splice(j, 1)
                }
            }
        }

        //remove user from users array in Groups
        for(i = 0; i<data.Groups.length; i++){
            for(j = 0; j<data.Groups[i].users.length; j++){
                if(req.body.username === data.Groups[i].users[j]){
                    data.Groups[i].users.splice(j, 1)
                }
            }
        }

        //remove user from group assis array
        for(i = 0; i<data.Groups.length; i++){
            for(j = 0; j<data.Groups[i].group_assis.length; j++){
                if(req.body.username === data.Groups[i].group_assis[j]){
                    data.Groups[i].group_assis.splice(j, 1)
                }
            }
        }
        //write the data back to the data file
        var JSON_data = JSON.stringify(data)
        fs.writeFile("data.json", JSON_data, function(err){
            if(err)
                console.log(err);
            else
                console.log("Removed User")
        });



    })

    //request endpoint for getting groups
    app.get('/getGroups', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        //read file data
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        
        //an array for storing the groups that user belongs to
        var current_user_group = []
        //an array for storing the group's details 
        var group_details = []
        //for loop to find out the groups that the user can access
        for(i =0; i<data.users.length; i++){
            if(user === data.users[i].username){

                for(j=0; j<data.users[i].adminGroupList.length; j++){
                    current_user_group.push(data.users[i].adminGroupList[j])
                }
            }
        }

        //for loop to get the details of the group and push them into the array
        for(i=0; i<data.Groups.length; i++){
            for(j=0; j<current_user_group.length; j++){
                if(data.Groups[i].name === current_user_group[j]){
                    group_details.push(data.Groups[i])
                }
            }
        }
  
        //send the details back to client side
        res.send(group_details);
    })

    //request endpoint for creating group
    app.post('/createGroup', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        //read file data
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        //array for storing the names for groups
        var group_names = []
        //the current user index
        var currentUser_index;
        //for loop to push the names of the groups into the array
        for(i = 0; i <data.Groups.length; i++){
            group_names.push(data.Groups[i].name)
        }

        //group object
        group = {}
        group.name = ""
        group.channels = []
        group.group_admin = []
        group.group_assis = []
        group.users = []

        //for loop to get the user index
        for(i = 0; i <data.users.length; i++){
            if(req.body.username === data.users[i].username){
                currentUser_index = i
            }
        }


        //check if the group is not exist, then push it to the Groups list
        if(group_names.indexOf(req.body.name) == -1){
            group.name = req.body.name
            group.channels = []
            group.group_admin.push(data.users[currentUser_index].username)
            group.group_assis = []
            group.users.push(data.users[currentUser_index].username)
            data.Groups.push(group)
            data.users[currentUser_index].adminGroupList.push(req.body.name)
            data.users[currentUser_index].groups.push({name: req.body.name, channels: []})
            res.send(true)
        }else{
            res.send(false)
        }

        //for loop to push the user who created the group to admin group list
        for(i = 0; i <data.users.length; i++){
            if(data.users[i].role === "Super"){
                // if(data.users[i].adminGroupList.indexOf(req.body.name) == -1){
                //     data.users[i].adminGroupList.push(req.body.name)
                // }
                data.users[i].adminGroupList = []
                for(j =0; j<data.Groups.length; j++){
                    data.users[i].adminGroupList.push(data.Groups[j].name)
                }
            }
        }
        
        //write the data back to the data file
        var JSON_data = JSON.stringify(data)
        fs.writeFile("data.json", JSON_data, function(err){
            if(err)
                console.log(err);
            else
                console.log("Created new group")
        });
        //res.send(data.Groups);
    })

    //request endpoint for removing group
    app.post('/removeGroup', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        //read file data
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        
        //for loop to remove the group in group array
        for(i = 0; i <data.Groups.length; i++){
            if(req.body.name === data.Groups[i].name){
                data.Groups.splice(i, 1)
                
            }
        }

        //for loop to remove the group in users array
        for(i = 0; i <data.users.length; i++){
            for(j = 0; j<data.users[i].groups.length; j++){
                if(req.body.name === data.users[i].groups[j].name){
                    data.users[i].groups.splice(j, 1)
                    
                }
            }

        }
        //for loop to remove the group in admin group list
        for(i = 0; i <data.users.length; i++){
            for(j = 0; j<data.users[i].adminGroupList.length; j++){
                if(req.body.name === data.users[i].adminGroupList[j]){
                    data.users[i].adminGroupList.splice(j, 1)
                    
                }
            }

        }

        //write the data back to data file
        var JSON_data = JSON.stringify(data)
        fs.writeFile("data.json", JSON_data, function(err){
            if(err)
                console.log(err);
            else
                console.log("Removed a group")
        });
        //send data back to client side
        res.send(true)

    })

    app.post("/createChannel", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        var selected_group_channels = []
        var selected_group = ""
        var valid = false
        var index = 0
        for(i = 0; i <data.Groups.length; i++){
            if(req.body.group === data.Groups[i].name){
                selected_group = req.body.group
                index = i
                for(j = 0; j<data.Groups[i].channels.length; j++){
                    selected_group_channels.push(data.Groups[i].channels[j])
                }
            }
        }

        console.log(selected_group_channels)
        console.log(selected_group)
        // for(i = 0; i <data.Groups.length; i++){
        //     if(selected_group === data.Groups[i].name && selected_group_channels.indexOf(req.body.channel) == -1){
        //         console.log(selected_group_channels)
        //         data.Groups[i].channels.push(req.body.channel)
        //         valid = true
        //     }else{
        //         valid = false
        //     }
        // }
        if(selected_group_channels.indexOf(req.body.channel) == -1){
            data.Groups[index].channels.push(req.body.channel)
            valid=true
        }else{
            valid = false
        }

        var channel = {}
        channel.name = ""
        channel.group = ""
        channel.users = []

        if(selected_group_channels.indexOf(req.body.channel) == -1){
            channel.name = req.body.channel
            channel.group = req.body.group
            channel.users = []
            data.Channels.push(channel)
        }

        res.send(valid)
        var JSON_data = JSON.stringify(data)
        fs.writeFile("data.json", JSON_data, function(err){
            if(err)
                console.log(err);
            else
                console.log("Created a channel")
        });

    })

    app.post("/getChannel", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        var channels = []

        for(i = 0; i <data.Groups.length; i++){
            if(req.body.group === data.Groups[i].name){
                for(j = 0; j<data.Groups[i].channels.length; j++){
                    channels.push(data.Groups[i].channels[j])
                }
            }
        }
    
        res.send(channels)
        
    })

    app.post("/removeChannel", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        var channels = []
        var selected_group = ""
        var group_index = 0
        var channel_index = 0
        var selected_user_group_index = ""
        for(i = 0; i <data.Groups.length; i++){
            if(req.body.group === data.Groups[i].name){
                selected_group = data.Groups[i].name
                group_index = i
                for(j = 0; j<data.Groups[i].channels.length; j++){
                    if(req.body.channel === data.Groups[i].channels[j]){
                        channel_index = j
                    }
                }
            }
        }

        for(i = 0; i <data.users.length; i++){
            for(j = 0; j<data.users[i].groups.length; j++){
                if(selected_group === data.users[i].groups[j].name){
                    selected_user_group_index = j
                    for(k = 0; k<data.users[i].groups[j].channels.length; k++){
                        if(req.body.channel === data.users[i].groups[j].channels[k]){
                            data.users[i].groups[j].channels.splice(k, 1)
                        }
                    }
                    
                }
            }

        }

        for(i = 0; i<data.Channels.length; i++){
            if(req.body.group === data.Channels[i].group && req.body.channel === data.Channels[i].name){
                data.Channels.splice(i, 1)
            }
        }

        data.Groups[group_index].channels.splice(channel_index, 1)
    
        var JSON_data = JSON.stringify(data)
        fs.writeFile("data.json", JSON_data, function(err){
            if(err)
                console.log(err);
            else
                console.log("Removed a channel")
        });

        res.send(true)
    })

    app.get("/getCurrentUser", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        var user_index = 0

        for(i = 0; i<data.users.length; i++){
            if(user === data.users[i].username){
                user_index = i
            }
        }

        res.send(data.users[user_index])

    })

    app.post("/inviteUser", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        var users_in_group;
        var selected_group_index;
        console.log()
        for(i=0; i<data.Groups.length; i++){
            if(req.body.group === data.Groups[i].name){
                selected_group_index = i
                users_in_group = data.Groups[i].users
                console.log(data.Groups[i].users)
            }
        }

        console.log(users_in_group)
        if(users_in_group.indexOf(req.body.username) == -1){
            
            data.Groups[selected_group_index].users.push(req.body.username)
            for(i=0; i<data.users.length; i++){
                if(req.body.username === data.users[i].username){
                    data.users[i].groups.push({name: req.body.group, channels:[]})
                }
            }
            res.send(true)
        }else{
            res.send(false)
        }



        var JSON_data = JSON.stringify(data)
        fs.writeFile("data.json", JSON_data, function(err){
            if(err)
                console.log(err);
            else
                console.log("Invited a user")
        });

    })

    app.post("/getGroupUsers", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        var current_group_users;
        for(i=0; i<data.Groups.length; i++){
            if(req.body.group === data.Groups[i].name){
                current_group_users = data.Groups[i].users
            }
        }

        res.send(current_group_users)
    })

    app.post("/kickUser", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)

        for(i=0; i<data.users.length; i++){
            if(req.body.username === data.users[i].username){
                for(j = 0; j<data.users[i].groups.length; j++){
                    if(req.body.group === data.users[i].groups[j].name){
                        data.users[i].groups.splice(j, 1)
                    }
                }
            }
        }

        for(i=0; i<data.Groups.length; i++){
            if(req.body.group === data.Groups[i].name){
                for(j=0; j<data.Groups[i].users.length; j ++){
                    if(req.body.username === data.Groups[i].users[j]){
                        data.Groups[i].users.splice(j, 1)
                    }
                }
            }
        }

        for(i=0; i<data.users.length; i++){
            if(req.body.username === data.users[i].username){
                for(j = 0; j<data.users[i].adminGroupList.length; j++){
                    if(req.body.group === data.users[i].adminGroupList[j]){
                        data.users[i].adminGroupList.splice(j, 1)
                    }
                }
            }
        }

        for(i=0; i<data.Groups.length; i++){
            if(req.body.group === data.Groups[i].name){
                for(j = 0; j<data.Groups[i].group_admin.length; j++){
                    if(req.body.username === data.Groups[i].group_admin[j]){
                        data.Groups[i].group_admin.splice(j, 1)
                    }
                }
            }
        }

        for(i =0 ; i<data.Channels.length; i++){
            if(req.body.group === data.Channels[i].group){
                for(j = 0; j<data.Channels[i].users.length; j++){
                    if(req.body.username === data.Channels[i].users[j]){
                        data.Channels[i].users.splice(j, 1)
                    }
                }
            }
        }

        var JSON_data = JSON.stringify(data)
        fs.writeFile("data.json", JSON_data, function(err){
            if(err)
                console.log(err);
            else
                console.log("Removed a user from a group")
        });

        res.send(true);

    })

    app.post("/gGroupUsers", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        var current_group_users;
        for(i=0; i<data.Groups.length; i++){
            if(req.body.group === data.Groups[i].name){
                current_group_users = data.Groups[i].users
            }
        }

        res.send(current_group_users)
    })

    app.post("/getGroupChannel", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)

        var current_group_channels;
        for(i=0; i<data.Groups.length; i++){
            if(req.body.group === data.Groups[i].name){
                current_group_channels = data.Groups[i].channels
            }
        }

        res.send(current_group_channels)
    })

    app.post("/addUserChannel", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)

        var user_group_channels = []
        var user_index;
        var group_index;
        for(i=0; i<data.users.length; i++){
            if(req.body.username === data.users[i].username){
                user_index = i
                for(j=0; j<data.users[i].groups.length; j++){
                    if(req.body.group === data.users[i].groups[j].name){
                        group_index = j
                        for(k=0; k<data.users[i].groups[j].channels.length; k++){
                            user_group_channels.push(data.users[i].groups[j].channels[k])
                        }
                    }
                }
            }
        }


        console.log(user_group_channels)
        if(user_group_channels.indexOf(req.body.channel) == -1){
            data.users[user_index].groups[group_index].channels.push(req.body.channel)
            for(i = 0; i<data.Channels.length; i++) {
                if(req.body.channel === data.Channels[i].name){
                    data.Channels[i].users.push(req.body.username)
                }
            }
            res.send(true)
        }else{
            res.send(false)
        }

        var JSON_data = JSON.stringify(data)
        fs.writeFile("data.json", JSON_data, function(err){
            if(err)
                console.log(err);
            else
                console.log("Added a user to channel" + req.body.channel)
        });

    })

    app.post("/getChannelUsers", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        var channel_users = []

        for(i =0; i<data.users.length; i++){
            for(j=0; j<data.users[i].groups.length; j++){
                if(req.body.group === data.users[i].groups[j].name){
                    for(k=0; k<data.users[i].groups[j].channels.length; k++){
                        if(req.body.channel === data.users[i].groups[j].channels[k]){
                            channel_users.push(data.users[i].username)
                        }
                    }
                }
            }
        }

        res.send(channel_users)
    })

    app.post("/rmUserFromChannel", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        var user_index;
        var group_index;
        var channel_index;

        for(i=0; i<data.users.length; i ++){
            if(req.body.username === data.users[i].username){
                user_index = i
                for(k=0; k<data.users[i].groups.length; k++){
                    if(req.body.group === data.users[i].groups[k].name){
                        group_index = k
                        for(j = 0; j<data.users[i].groups[k].channels.length; j++){
                            if(req.body.channel === data.users[i].groups[k].channels[j]){
                                channel_index = j
                            }
                        }
                    }
                }
            }
        }

        for(i = 0; i<data.Channels.length; i++){
            if(req.body.group === data.Channels[i].group && req.body.channel === data.Channels[i].name){
                for(j = 0; j<data.Channels[i].users.length; j++){
                    if(req.body.username === data.Channels[i].users[j]){
                        data.Channels[i].users.splice(j, 1)
                    }
                }
            }
        }

        data.users[user_index].groups[group_index].channels.splice(channel_index, 1)

        var JSON_data = JSON.stringify(data)
        fs.writeFile("data.json", JSON_data, function(err){
            if(err)
                console.log(err);
            else
                console.log("Removed a user from channel" + req.body.channel + " in group:" + req.body.group)
        });

        res.send(true)
    })

    app.post("/createWithSuper", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        var usernames = []
        var emails = []
        for(i = 0; i <data.users.length; i++){
            usernames.push(data.users[i].username)
            emails.push(data.users[i].email)
        }
        console.log(usernames)

        var customer = {}
        customer.username = ""
        customer.email = ""
        customer.password = ""
        customer.groups = []
        customer.role = ""
        customer.adminGroupList = []
        customer.valid = false

        if(usernames.indexOf(req.body.username) == -1 && emails.indexOf(req.body.email) == -1){
            customer.username = req.body.username
            customer.email = req.body.email
            customer.password = ""
            customer.groups = []
            customer.role = req.body.role
            customer.adminGroupList = []
            customer.valid = false
            data.users.push(customer)
            res.send(true)
        }else{
            res.send(false)
        }


        var JSON_data = JSON.stringify(data)
        fs.writeFile("data.json", JSON_data, function(err){
            if(err)
                console.log(err);
            else
                console.log("Created user with super admin role")
        });
        
    })

    app.post("/giveAssis", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)

        for(i=0; i<data.users.length; i++){
            if(req.body.username === data.users[i].username){
                if(data.users[i].role !== "Super" && data.users[i].role !== "Group Admin"){
                    res.send(true)
                    data.users[i].role = "Group Assis"
                    data.users[i].adminGroupList.push(req.body.group)
                    for(j =0; j<data.Groups.length; j++){
                        if(req.body.group === data.Groups[j].name){
                            data.Groups[j].group_assis.push(req.body.username)
                        }
                    }
                }else{
                    res.send(false)
                }
            }
        }

        var JSON_data = JSON.stringify(data)
        fs.writeFile("data.json", JSON_data, function(err){
            if(err)
                console.log(err);
            else
                console.log("Provided a user with group assis role")
        });
        

    })

    app.post("/giveSuper", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        var super_admins = []
        var message;
        var current_groups = []
        for(i=0; i<data.users.length; i++){
            if(data.users[i].role === "Super"){
                super_admins.push(data.users[i].username)
            }
        }

        if(super_admins.length < 2){
            for(i =0; i<data.users.length; i++){
                if(req.body.name === data.users[i].username){
                    if(data.users[i].role !== "Super"){
                        data.users[i].role = "Super"
                        message = true
                        break
                    }
                }
            }
        }else{
            message = false
        }

        if(message === true){
            for(i = 0; i<data.Groups.length; i++){
                data.Groups[i].group_admin.push(req.body.name)
                current_groups.push(data.Groups[i].name)
            }
            for(i =0; i<data.users.length; i++){
                if(req.body.name === data.users[i].username){
                    for(j =0; j<current_groups.length; j++){
                        data.users[i].adminGroupList.push(current_groups[j])
                    }
                }
            }
        }
        var JSON_data = JSON.stringify(data)
        fs.writeFile("data.json", JSON_data, function(err){
            if(err)
                console.log(err);
            else
                console.log("Provided a user with super admin role")
        });

        res.send(message)
    })

    app.post("/getChannels", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        var group_channels = []
        for(i =0; i<data.Channels.length; i++){
            if(req.body.group === data.Channels[i].group){
                group_channels.push(data.Channels[i])
            }
        }

        console.log(group_channels)
        res.send(group_channels)
    })

    app.get("/getUserGroups", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)

        var user_groups = []
        for(i=0; i<data.users.length; i++){
            if(user === data.users[i].username){
                for(j = 0; j<data.users[i].groups.length; j++){
                    user_groups.push(data.users[i].groups[j].name)
                }
            }
        }
        console.log(user_groups)

        res.send(user_groups)
        
    })

    app.post("/getUserGroupCh", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        var channels_name = []
        console.log(data.users[0].groups[0].name)
        for(i=0; i<data.users.length; i++){
            if(user === data.users[i].username){
                for(j = 0; j<data.users[i].groups.length; j++){
                    if(req.body.group === data.users[i].groups[j].name){
                        console.log(data.users[i].groups[j].name)
                        for(k =0; k<data.users[i].groups[j].channels.length; k++){
                            channels_name.push(data.users[i].groups[j].channels[k])
                        }
                    }
                }
            }
        }
        console.log(channels_name)
        res.send(channels_name)
    })
}