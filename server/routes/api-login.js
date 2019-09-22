module.exports = function(app, path, db, ObjectID){
    var fs = require('fs');

    console.log("hello")
    //The login user
    var user = ""
    var user_email = ""
    //request endpoint for checking user is exist or not
    //check email exist in the data or not
    //Check the user in action
    //Get the user details and assign them into an object
    //send the object back to client side
    app.post('/api/auth', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }

        login_user = req.body
        console.log(login_user)
        const collection = db.collection('users')
        collection.find({'email': login_user.email, 'password': login_user.password}).count((err, count)=>{
            if(count === 1 ){
                if(err) throw err;
                collection.find({'email': login_user.email, 'password': login_user.password}).limit(1).toArray((err, docs)=>{
                    res.send(docs)
                    user = docs[0].username
                })
            }else{
                res.send([{valid:true}])
            }
        })

        user_email = req.body.email
        
    })

    //request endpoint for getting users
    app.get('/getUsers', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        //read file data
        const collection = db.collection('users');
        collection.find({}).toArray((err,data)=>{
        
            res.send(data);
            console.log(data)
        })
        //send data back to client side
    })

    //request endpoint for creating user
    //Check if user already exist or not
    //create user object using request data
    //write data back to file
    app.post('/createUser', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }

        new_user = req.body;
        console.log(new_user)
        const collection = db.collection('users')
        collection.find({'email': new_user.email}).count((err, count)=>{
            if(count == 0){
                collection.insertOne(new_user, (err, dbres)=>{
                    if(err) throw err;
                    res.send(true)
                })
            }else{
                res.send(false)
            }
        })
        
        

    })

    //request endpoint for removing user
    //Check which user is in action using for loop
    //Check user is super or not
    //Remove user object in users
    //Remove user from Groups that user have joined
    //Remove user from group assis in Groups
    //write data back to file
    app.post('/removeUser', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        
        user_id = req.body.objID
        var objectid = new ObjectID(user_id)
        console.log(objectid)
        const collection = db.collection('users');
        const groupCollection = db.collection('groups')
        collection.findOne({_id: objectid}, (err, data)=>{
            console.log(objectid)
            groupCollection.updateMany({}, {$pull: {'group_admin': data.username}})
            groupCollection.updateMany({}, {$pull: {'users': data.username}})
        })

        collection.find({_id:objectid}).toArray((err, docs)=>{
            if(docs[0].role === "Super"){
                res.send(false)
            }else{
                collection.deleteOne({_id:objectid}, (err, docs)=>{
                    res.send(true)
                })
            }
        })

   

        // collection.findOne({_id: objectid}, (data)=>{
        //     groupCollection.updateMany({}, {$pull: {'users': data.username}})
        // })
        // collection.find({"group_admin": {$in: [user]}} ).toArray((err, docs)=>{
        //     res.send(docs)
        // })
        // //remove user from group admin array
        // for(i = 0; i<data.Groups.length; i++){
        //     for(j = 0; j<data.Groups[i].group_admin.length; j++){
        //         if(req.body.username === data.Groups[i].group_admin[j]){
        //             data.Groups[i].group_admin.splice(j, 1)
        //         }
        //     }
        // }

        // //remove user from users array in Groups
        // for(i = 0; i<data.Groups.length; i++){
        //     for(j = 0; j<data.Groups[i].users.length; j++){
        //         if(req.body.username === data.Groups[i].users[j]){
        //             data.Groups[i].users.splice(j, 1)
        //         }
        //     }
        // }

        // //remove user from group assis array
        // for(i = 0; i<data.Groups.length; i++){
        //     for(j = 0; j<data.Groups[i].group_assis.length; j++){
        //         if(req.body.username === data.Groups[i].group_assis[j]){
        //             data.Groups[i].group_assis.splice(j, 1)
        //         }
        //     }
        // }




    })

    //request endpoint for getting groups
    //Check the logged in user
    //Find the groups that the user have control with using for loop in adminGroupList
    //Get groups details
    //send data back
    app.get('/getGroups', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }

        const collection = db.collection('groups')
        collection.find({"group_admin": {$in: [user]}} ).toArray((err, docs)=>{
            res.send(docs)
        })

    })

    //request endpoint for creating group
    //check if the group exist or not
    //Create the group object using the request data
    //write data back to file
    app.post('/createGroup', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }

        new_group = {name: req.body.name, channels: [], group_admin: [user], group_assis: [], users: [user]}
        const collection = db.collection('groups')
        const userCollection = db.collection('users')
        groups = []
        new_groups = []
        superUsers =[]
        new_superUsers = []
        collection.find({'name': req.body.name}).count((err, count)=>{
            if(count == 0){
                collection.insertOne(new_group, (err, dbres)=>{
                    if(err) throw err;
                    res.send(true)
                })
            }else{
                res.send(false)
            }
        })

        //add the group to the user's adminGroupList who created the group
        // userCollection.updateOne({'username': user}, {$addToSet :{"adminGroupList": req.body.name}}, ()=>{
        //     console.log(user)
        //     console.log(req.body.name)
        //     console.log("updated")
        // })

        // //Get all the group names
        // collection.find({}, {'name':true}).toArray((err, docs)=>{
        //     console.log(docs)
        // })
        // console.log(new_groups)
        // //update Super users' adminGroupList to have control with all the groups
        // userCollection.updateMany({'role': 'Super'}, {$set: {'adminGroupList': new_groups}})
        // userCollection.find({'role': "Super"}, {'username':1}).toArray((err, data)=>{
        //     console.log(data)
        // })
        // for(i = 0; i<superUsers.length; i++){
        //     new_superUsers.push(superUsers[i].name)
        // }
        // //push super user to group admin array
        // for(i=0; i<superUsers.length; i++){
        //     collection.find({'group_admin': {$in: [superUsers[i]]}}).count((err, count)=>{
        //         if(count ==0){
        //             collection.update({}, {$push: {'group_admin': superUsers[i]}})
        //         }else{
        //             console.log("super user is already the group admin of the group ")
        //         }
        //     })
        // }
        userCollection.find({'role': 'Super'}).forEach(data =>{
            console.log(data.username)
 
            collection.updateMany({}, {$addToSet: {'group_admin': data.username}})

 
        })
        

        // //check if the group is not exist, then push it to the Groups list
        // if(group_names.indexOf(req.body.name) == -1){
        //     group.name = req.body.name
        //     group.channels = []
        //     group.group_admin.push(data.users[currentUser_index].username)
        //     group.group_assis = []
        //     group.users.push(data.users[currentUser_index].username)
        //     data.Groups.push(group)
        //     data.users[currentUser_index].adminGroupList.push(req.body.name)
        //     data.users[currentUser_index].groups.push({name: req.body.name, channels: []})
        //     res.send(true)
        // }else{
        //     res.send(false)
        // }

        // //for loop to push the user who created the group to admin group list
        // for(i = 0; i <data.users.length; i++){
        //     if(data.users[i].role === "Super"){
        //         // if(data.users[i].adminGroupList.indexOf(req.body.name) == -1){
        //         //     data.users[i].adminGroupList.push(req.body.name)
        //         // }
        //         data.users[i].adminGroupList = []
        //         for(j =0; j<data.Groups.length; j++){
        //             data.users[i].adminGroupList.push(data.Groups[j].name)
        //         }
        //     }
        // }
        
    })

    //request endpoint for removing group
    //remove group in Groups using for loop to find the group
    //remove group in users who ever has the group
    //remove group in adminGroup
    //remove channels that belonds to the group in Channels
    //write data back to file
    app.post('/removeGroup', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }

        const collection = db.collection('groups')

        collection.deleteOne({'name': req.body.name}, (err,docs)=>{
            res.send(true)
        })

        
        // //for loop to remove the group in group array
        // for(i = 0; i <data.Groups.length; i++){
        //     if(req.body.name === data.Groups[i].name){
        //         data.Groups.splice(i, 1)
                
        //     }
        // }

        // //for loop to remove the group in users array
        // for(i = 0; i <data.users.length; i++){
        //     for(j = 0; j<data.users[i].groups.length; j++){
        //         if(req.body.name === data.users[i].groups[j].name){
        //             data.users[i].groups.splice(j, 1)
                    
        //         }
        //     }

        // }
        // //for loop to remove the group in admin group list
        // for(i = 0; i <data.users.length; i++){
        //     for(j = 0; j<data.users[i].adminGroupList.length; j++){
        //         if(req.body.name === data.users[i].adminGroupList[j]){
        //             data.users[i].adminGroupList.splice(j, 1)
                    
        //         }
        //     }

        // }

        // //for loop to remove all the channels object that belongs to the group
        // for(var k = data.Channels.length; k > 0 ; k -= 1){
        //     console.log(k)
        //     if(data.Channels[k-1].group === req.body.name){
        //         console.log(k)
        //         data.Channels.splice(k-1, 1)
        //     }
            
        // }

    })

    //The request that usede to create a channel
    //Check if the channel is already exist in the group or not
    //if no create new channel object else send data back
    //Write data back to file at the end
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

    //The request used to get channels of the group
    //Check the group and get all the channels then send back to client side
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

    //The request to remove channel
    //Check the group of the channel that in remove action
    //Remove the channel in the group that the channel 
    //Remove the channel in users if user have joined the channel
    //Remove the channel object in Channels
    //Write the data back to file
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

    //The request used to get currnet user details
    //Check which user is logged in
    //Get detail and send it back
    app.get("/getCurrentUser", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        console.log(user_email)
        const collection = db.collection('users');
        collection.find({'email':user_email}).limit(1).toArray((err,docs)=>{
            //send to client and array of items limited to 1.
            console.log(docs);
              res.send(docs);
        })

    })

    //The request used to invite a user to group
    //Check which user is in invite action using for loop
    //Check if user already in group or not
    //Add the user to the Groups and add the group to the user's group
    //Write data back to file
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
                    if(data.users[i].role === "Group Admin"){
                        console.log("group admin")
                        data.users[i].adminGroupList.push(req.body.group)
                        for(j=0; j<data.Groups.length; j++){
                            if(req.body.group === data.Groups[j].name){
                                data.Groups[j].group_admin.push(data.users[i].username)
                            }
                        }
                    }
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

    //The request used to get group users
    //Check which group
    //Get the users in the group and send them back
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

    //The request used to kick user out of group
    //check which group and user is in action
    //remove the user from Groups
    //remove the group from users
    //if user is group assis, remove user and change users role back to normal user
    //write data back to file 
    app.post("/kickUser", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        var user_position =0
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

        for(i=0; i<data.users.length; i++){
            if(req.body.username === data.users[i].username){
                user_position = i
            }
        }

        if(data.users[user_position].role === "Group Assis"){
            data.users[user_position].role = "user"
            for(i=0; i<data.Groups.length; i++){
                if(req.body.group === data.Groups[i].name){
                    for(j = 0; j<data.Groups[i].group_assis.length; j++){
                        if(req.body.username === data.Groups[i].group_assis[j]){
                            data.Groups[i].group_assis.splice(j, 1)
                        }
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

    //The request used to get group users
    //Check which group, get the users and send back
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

    //The request used to get the channels in the group
    //Check which group and get all the channels of the group and send back
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

    //The request used to add user to channel
    //Check which user, group and channel is in action
    //Check if user already in channel or not
    //add user to Channels and Groups
    //add channel to users
    //write data back to file
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

    //The request used to get users in channel
    //check which group and channel is in action
    //get the users in the channel and send back
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

    //The request used to remove user from channel
    //Check which user, group and channel is in action
    //remove channel from user
    //remove user from Channels
    //write data back to file
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

    //The request used to create user by using super admin role
    //Check username and email already exist or not
    //Create new user object using details from client side
    //write data back to file
    app.post("/createWithSuper", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }

        new_user = req.body;
        console.log(new_user)
        const collection = db.collection('users')
        collection.find({'email': new_user.email}).count((err, count)=>{
            if(count == 0){
                collection.insertOne(new_user, (err, dbres)=>{
                    if(err) throw err;
                    res.send(true)
                })
            }else{
                res.send(false)
            }
        })

        
    })

    //The request used to give assis role to user
    //Check is user is super or group admin
    //Find the user and change their role, and give control to the group channels
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

    //The request used to give super admin role to user
    //Check which user is in action
    //Check the user is super or not
    //Find the user and change users role
    //Give control to all the groups by adding all the groups to users groups and users admingroup
    //write data back to file
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

    //The request used to get group channels
    //Check which group is in action, get the channels of the group using for loop
    //send data back
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

    //The request used to get the groups that user have joined
    //Check which user is in action
    //Get the groups in users using for loop
    //send data back
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

    //The request used to get the channels of the group that user have joined
    //Check which user and group is in action
    //Find the group in users using for loop
    //Get the channels of teh group and send back 
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