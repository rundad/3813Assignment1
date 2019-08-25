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

        if(usernames.indexOf(req.body.username) == -1 && emails.indexOf(req.body.email) == -1 && req.body.username !== "" && req.body.email !== ""){
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

}