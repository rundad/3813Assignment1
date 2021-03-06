module.exports = function(app, path, db, ObjectID, formidable){
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


    app.post('/api/upload', function(req, res){
        var form = new formidable.IncomingForm({uploadDir: './images'})
        form.keepExtensions = true;

        form.on('error', function(err){
            throw err;
            res.send({
                result:"failed",
                data: {},
                message: "cannot upload"
            })
        })

        form.on('fileBegin', function(name, file){
            file.path = form.uploadDir + "/" + file.name
            console.log("file path:" + file.path)
        })

        form.on('file', function(field, file){
            res.send({
                result: 'OK',
                data: {'filename': file.name},
                message: "upload successful"
            })
        })
        
        form.parse(req)
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
        const channelCollection = db.collection('channels')
        collection.find({_id:objectid}).count((err, count)=>{
            if(count == 0){
                res.send(false)
            }else{
                collection.find({_id:objectid}).toArray((err, docs)=>{
                    if(docs[0].role === "Super" && docs[0].username === "super"){
                        console.log("user is super")
                    }else{
                        collection.findOne({_id: objectid}, (err, data)=>{
                            console.log(objectid)
                            groupCollection.updateMany({}, {$pull: {'group_admin': data.username}})
                            groupCollection.updateMany({}, {$pull: {'users': data.username}})
                            channelCollection.updateMany({}, {$pull: {'users': data.username}})
                        })
                        collection.deleteOne({_id:objectid})
                        res.send(true)
        
                    }
                })
            }

        })

        // //remove user from group admin array

        // //remove user from users array in Groups

        // //remove user from group assis array

    })

    //request endpoint for getting groups
    //Check the logged in user
    //Find the groups that the user have control with using for loop in adminGroupList
    //Get groups details
    //send data back
    app.post('/getGroups', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }

        const collection = db.collection('groups')
        collection.find({"group_admin": {$in: [req.body.username]}} ).toArray((err, docs)=>{
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

        new_group = {name: req.body.name, channels: [], group_admin: [req.body.username], group_assis: [], users: [req.body.username]}
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
                    userCollection.updateOne({'username': req.body.username}, {$addToSet: {'groups': {'name': req.body.name, 'channels': []}}})
                    res.send(true)
                })
            }else{
                res.send(false)
            }
        })

        //add the group to the user's adminGroupList who created the group

        // //push super user to group admin array

        userCollection.find({'role': 'Super'}).forEach(data =>{
            console.log(data.username)
 
            collection.updateMany({}, {$addToSet: {'group_admin': data.username}})

 
        })

        // //check if the group is not exist, then push it to the Groups list

        // //for loop to push the user who created the group to admin group list
        
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
        const userCollection = db.collection('users')
        const channelCollection = db.collection('channels')
        //delete the group in groups
        collection.deleteOne({'name': req.body.name}, (err,docs)=>{
            res.send(true)
        })

 
        //delete the group in users
        //delete the channels that the group has
        userCollection.updateMany({}, {$pull: {'groups': {'name': req.body.name}}})
        channelCollection.deleteMany({'group': req.body.name})
   
        // }
        // //for loop to remove the group in admin group list

    })

    //The request that usede to create a channel
    //Check if the channel is already exist in the group or not
    //if no create new channel object else send data back
    //Write data back to file at the end
    app.post("/createChannel", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }

        const collection = db.collection('groups')
        const channelCollection = db.collection('channels')
        const userCollection = db.collection('users')

        //craete a new channel if the group doesnt have the channel
        //add the channel to group array
        //add the channel to the user's channel array who have created the channel
        new_channel = {name: req.body.channel, group: req.body.group, users: [req.body.username], messages: []}
        channelCollection.find({'name': req.body.channel, 'group': req.body.group}).count((err, count)=>{
            if(count == 0){
                channelCollection.insertOne(new_channel, (err, dbres)=>{
                    if(err) throw err;
                    collection.updateOne({'name': req.body.group}, {$addToSet: {'channels': req.body.channel}})
                    userCollection.updateOne({'username': req.body.username, 'groups.name': req.body.group}, {$addToSet: {'groups.$.channels': req.body.channel}})
                    userCollection.find({$or: [{'role': 'Super'}, {'role': 'Group Admin'}, {'role': 'Group Assis'}]}).forEach(data=>{
                        userCollection.updateOne({'username': data.username, 'groups.name': req.body.group}, {$addToSet: {'groups.$.channels': req.body.channel}})
                        channelCollection.updateOne({'name': req.body.channel, 'group': req.body.group}, {$addToSet: {'users': data.username}})
                    })
                    res.send(true)
                })
            }else{
                res.send(false)
            }
        })



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
        const collection = db.collection('groups')
        const channelCollection = db.collection('channels')
        const userCollection = db.collection('users')

        //delete channel in channels
        //delete channel in groups
        //delete channel in users who has/in the channel
        channelCollection.deleteOne({'group': req.body.group, 'name': req.body.channel})
        collection.updateOne({'name': req.body.group}, {$pull: {'channels': req.body.channel}})
        userCollection.updateMany({'groups.name': req.body.group}, {$pull: {'groups.$.channels': req.body.channel}})
        res.send(true)
    
 
    })

    //The request used to get currnet user details
    //Check which user is logged in
    //Get detail and send it back
    app.post("/getCurrentUser", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        console.log(user_email)
        const collection = db.collection('users');
        // collection.find({'email':user_email}).limit(1).toArray((err,docs)=>{
        //     //send to client and array of items limited to 1.
        //     console.log(docs);
        //       res.send(docs);
        // })
        collection.find({'username':req.body.username}).limit(1).toArray((err,docs)=>{
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

        const collection = db.collection('groups')
        const userCollection = db.collection('users')
        //add user to group's users array
        //add group to user's groups array
        //add user to group's group_admin array is the user is a group admin
        console.log("invite user: ",req.body.username)
        collection.find({'name': req.body.group, 'users': {$in: [req.body.username]}}).count((err, count) =>{
            console.log(count)
            if(count == 0){
                collection.updateOne({'name': req.body.group},{$addToSet: {'users': req.body.username}})
                userCollection.updateOne({'username': req.body.username}, {$addToSet: {'groups': {'name': req.body.group, 'channels': []}}})
                userCollection.find({'username': req.body.username, 'role': 'Group Admin'}).count((err, count)=>{
                    if(count == 1){
                        collection.updateOne({'name': req.body.group}, {$addToSet: {'group_admin': req.body.username}})
                    }
                })
                res.send(true)
            }else{
                res.send(false)
            }
        })
  

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

        //remove the group in user's groups array
        //remove user from group's users array
        //remove user from group_admin array if user is a group admin
        //remove user from group_assis array if user is a group assis, change user's role to normal user
        //remoev user from all the channels that in the group
        const collection = db.collection('groups')
        const userCollection = db.collection('users')
        const channelCollection = db.collection('channels')

        userCollection.find({'username': req.body.username, 'role': 'Super'}).count((err, count)=>{
            if(count == 0){
                userCollection.updateOne({'username': req.body.username}, {$pull: {'groups': {'name': req.body.group}}})
                collection.updateOne({'name': req.body.group}, {$pull: {'group_admin': req.body.username}})
            }else{
                userCollection.updateOne({'username': req.body.username}, {$pull: {'groups': {'name': req.body.group}}})
            }
        })
        //userCollection.updateOne({'username': req.body.username}, {$pull: {'groups': {'name': req.body.group}}})
        collection.updateOne({'name': req.body.group}, {$pull: {'users': req.body.username}})
        //collection.updateOne({'name': req.body.group}, {$pull: {'group_admin': req.body.username}})
        userCollection.find({'username': req.body.username, 'role': 'Group Assis'}, ()=>{
            userCollection.updateOne({'username': req.body.username}, {$set: {'role': 'user'}})
            collection.updateOne({'name': req.body.group}, {$pull: {'group_assis': req.body.username}})
        })
        channelCollection.updateMany({'group': req.body.group}, {$pull: {'users': req.body.username}})
        res.send(true)
       


    })

    //The request used to get group users
    //Check which group, get the users and send back
    app.post("/gGroupUsers", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
 
        const collection = db.collection('groups')
        collection.findOne({'name': req.body.group}, (err, data)=>{
            res.send(data)
        })
        // for(i=0; i<data.Groups.length; i++){
        //     if(req.body.group === data.Groups[i].name){
        //         current_group_users = data.Groups[i].users
        //     }
        // }


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


        const collection = db.collection('channels')
        const userCollection = db.collection('users')
        collection.find({'name': req.body.channel, 'group': req.body.group, 'users': {$in: [req.body.username]}}).count((err, count)=>{
            if(count == 0){
                userCollection.updateOne({'username': req.body.username, 'groups.name': req.body.group}, {$addToSet: {'groups.$.channels': req.body.channel}})
                collection.updateOne({'name': req.body.channel, 'group': req.body.group}, {$addToSet: {'users': req.body.username}})
                res.send(true)
            }else{
                res.send(false)
            }
        })


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

        const collection = db.collection('channels')
        const userCollection = db.collection('users')
        userCollection.updateOne({'username': req.body.username, 'groups.name': req.body.group}, {$pull: {'groups.$.channels': req.body.channel}})
        collection.updateOne({'name': req.body.channel, 'group': req.body.group}, {$pull: {'users': req.body.username}})
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

        const collection = db.collection('groups')
        const userCollection = db.collection('users')
        const channelCollection = db.collection('channels')
        userCollection.find({'username': req.body.username, 'role': 'user'}).count((err, count)=>{
            if(count == 1){
                userCollection.updateOne({'username': req.body.username}, {$set: {'role': 'Group Assis'}})
                
                collection.updateOne({'name': req.body.group}, {$addToSet: {'group_admin': req.body.username}})
                channelCollection.updateMany({'group': req.body.group}, {$addToSet: {'users': req.body.username}})
                channelCollection.find({'group': req.body.group}).forEach(data =>{
                    userCollection.updateOne({'username': req.body.username, 'groups.name': req.body.group}, {$addToSet: {'groups.$.channels': data.name}})
                })
                res.send(true)
            }else{
                res.send(false)
            }
        })

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

        const collection = db.collection('groups')
        const userCollection = db.collection('users')
        userCollection.find({'username': req.body.name, 'role': "Super"}).count((err, count)=>{
            if(count == 0){
                userCollection.updateOne({'username': req.body.name}, {$set: {'role': "Super"}})
                collection.find({}).forEach(data =>{
                    userCollection.updateOne({'username': req.body.name}, {$addToSet: {'groups': {'name': data.name, 'channels': []}}})
                    collection.updateOne({'name': data.name}, {$addToSet: {'group_admin': req.body.name}})
                    collection.updateOne({'name': data.name}, {$addToSet: {'users': req.body.name}})
        
         
                })
                
                res.send(true)
            }else{
                res.send(false)
            }
        })

        
    })

    //The request used to get group channels
    //Check which group is in action, get the channels of the group using for loop
    //send data back
    app.post("/getChannels", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
  
        const collection = db.collection('channels')
        collection.find({'group': req.body.group}).toArray((err, data)=>{
            console.log(data)
            res.send(data)
        })
  
    })

    //The request used to get the groups that user have joined
    //Check which user is in action
    //Get the groups in users using for loop
    //send data back
    app.post("/getUserGroups", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
 
        const collection = db.collection('groups')
        collection.find({'users': {$in: [req.body.username]}}).toArray((err, docs)=>{
            res.send(docs)
        })


        
    })

    //The request used to get the channels of the group that user have joined
    //Check which user and group is in action
    //Find the group in users using for loop
    //Get the channels of teh group and send back 
    app.post("/getUserGroupCh", function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }

        const collection = db.collection('channels')
        collection.find({'group': req.body.group, 'users': {$in: [req.body.username]}}).toArray((err, docs)=>{
            res.send(docs)
        })


    })
}