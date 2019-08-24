module.exports = function(app, path){
    var fs = require('fs');

    var dat = fs.readFileSync("data.json", 'utf8')
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

    var data = JSON.parse(dat)
    console.log("hello")
    app.post('/api/auth', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }

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
}