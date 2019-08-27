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
    var user = ""
    app.post('/api/auth', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }

        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)

        var customer = {}
        customer.username = ""
        customer.email = ""
        customer.password = ""
        customer.groups = []
        customer.role = ""
        customer.adminGroupList = []
        customer.valid = false
        //customer.channel = []

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

    app.get('/getUsers', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        
        res.send(data.users);
    })

    app.post('/createUser', function(req, res){
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
            customer.role = "user"
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
                console.log("Write operation complete")
        });
        

    })

    app.post('/removeUser', function(req, res){
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

        for(i = 0; i <data.users.length; i++){
            if(req.body.username === data.users[i].username){
                data.users.splice(i, 1)
                res.send(true)
            }

        }
        var JSON_data = JSON.stringify(data)
        fs.writeFile("data.json", JSON_data, function(err){
            if(err)
                console.log(err);
            else
                console.log("Removed User")
        });



    })

    app.get('/getGroups', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        
        var current_user_group = []
        var group_details = []
        for(i =0; i<data.users.length; i++){
            if(user === data.users[i].username){

                for(j=0; j<data.users[i].adminGroupList.length; j++){
                    current_user_group.push(data.users[i].adminGroupList[j])
                }
            }
        }

        for(i=0; i<data.Groups.length; i++){
            for(j=0; j<current_user_group.length; j++){
                if(data.Groups[i].name === current_user_group[j]){
                    group_details.push(data.Groups[i])
                }
            }
        }
  
        res.send(group_details);
    })

    app.post('/createGroup', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        var group_names = []
        var currentUser_index;
        for(i = 0; i <data.Groups.length; i++){
            group_names.push(data.Groups[i].name)
        }

        group = {}
        group.name = ""
        group.channels = []
        group.group_admin = []
        group.group_assis = []
        group.users = []

        for(i = 0; i <data.users.length; i++){
            if(req.body.username === data.users[i].username){
                currentUser_index = i
                data.users[i].adminGroupList.push(req.body.name)
                data.users[i].groups.push({name: req.body.name, channels: []})
            }
        }


        if(group_names.indexOf(req.body.name) == -1){
            group.name = req.body.name
            group.channels = []
            group.group_admin.push(data.users[currentUser_index].username)
            group.group_assis = []
            group.users.push(data.users[currentUser_index].username)
            data.Groups.push(group)
            res.send(true)
        }else{
            res.send(false)
        }

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
        

        var JSON_data = JSON.stringify(data)
        fs.writeFile("data.json", JSON_data, function(err){
            if(err)
                console.log(err);
            else
                console.log("Created new group")
        });
        //res.send(data.Groups);
    })

    app.post('/removeGroup', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        
        for(i = 0; i <data.Groups.length; i++){
            if(req.body.name === data.Groups[i].name){
                data.Groups.splice(i, 1)
                
            }
        }

        for(i = 0; i <data.users.length; i++){
            for(j = 0; j<data.users[i].groups.length; j++){
                if(req.body.name === data.users[i].groups[j].name){
                    data.users[i].groups.splice(j, 1)
                    
                }
            }

        }
        for(i = 0; i <data.users.length; i++){
            for(j = 0; j<data.users[i].adminGroupList.length; j++){
                if(req.body.name === data.users[i].adminGroupList[j]){
                    data.users[i].adminGroupList.splice(j, 1)
                    
                }
            }

        }

        var JSON_data = JSON.stringify(data)
        fs.writeFile("data.json", JSON_data, function(err){
            if(err)
                console.log(err);
            else
                console.log("Removed a group")
        });
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
}