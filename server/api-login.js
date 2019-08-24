var server = require('server.js')

module.exports = function(app, path){
    app.post('/api/auth', function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }

        var customer = {}
        customer.username = ""
        customer.email = ""
        customer.role = ""
        customer.valid = false
        
        for(i = 0; i <server.users.length; i++){
            if(req.body.email === server.users[i].email){
                customer.username = server.users[i].username
                customer.email = server.users[i].email
                customer.role = server.users[i].role
                customer.valid = true
                //res.send(customer);
            }
        }
        res.send(customer);
    })


}