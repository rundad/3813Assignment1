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
        customer.valid = false
        //customer.channel = []

        for(i = 0; i <data.users.length; i++){
            if(req.body.email === data.users[i].email){
                customer.username = data.users[i].username
                customer.email = data.users[i].email
                customer.password = data.users[i].password
                customer.groups = data.users[i].groups
                customer.role = data.users[i].role
                customer.valid = true
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
        customer.valid = false

        if(usernames.indexOf(req.body.username) == -1 && emails.indexOf(req.body.email) == -1){
            customer.username = req.body.username
            customer.email = req.body.email
            customer.password = ""
            customer.groups = []
            customer.role = "user"
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
        
        res.send(data.Groups);
    })

    app.post('/createGroup', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var dat = fs.readFileSync("data.json", 'utf8')
        var data = JSON.parse(dat)
        var group_names = []

        for(i = 0; i <data.Groups.length; i++){
            group_names.push(data.Groups[i].name)
        }

        group = {}
        group.name = ""
        group.channels = []
        group.group_admin = []
        group.group_assis = []

        if(group_names.indexOf(req.body.name) == -1){
            group.name = req.body.name
            group.channels = []
            group.group_admin = []
            group.group_assis = []
            data.Groups.push(group)
            res.send(true)
        }else{
            res.send(false)
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
            if(req.body.name === data.Groups[i].hame){
                data.Groups.splice(i, 1)
                
            }
        }

        for(i = 0; i <data.users.length; i++){
            for(j = 0; j<data.users[i].groups.length; j++){
                if(req.body.name === data.users[i].groups[j].name){
                    data.users[i].groups.splice(j, 1)
                    res.send(true)
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

    })

}