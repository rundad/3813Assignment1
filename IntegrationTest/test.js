let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('Server test', function(){

    before(function(){
        console.log("before test")
    })

    after(function(){
        console.log("after test")
    })

    describe('auth', ()=>{
        it('auth route should return an array', ()=>{
            chai.request("http://localhost:3000").post('/api/auth')
            .send({'email': 'test@com.au', 'password': 'test'})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
            })
        })
        it('auth route should return an array', ()=>{
            chai.request("http://localhost:3000").post('/api/auth')
            .send({'email': 'test@com.au', 'password': 'test'})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.length.should.be.eql(1);
            })
        })
        
    })

    describe('/getUsers', ()=>{
        it('should return an array of users', ()=>{
            chai.request("http://localhost:3000").get('/getUsers')
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
            })
        })
        it('should return an array of users', ()=>{
            chai.request("http://localhost:3000").get('/getUsers')
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
            })
        })
        
    })
    // describe('/api/upload', ()=>{
    //     it('should return an array of users', ()=>{
    //         chai.request("http://localhost:3000").post('/api/upload')
    //         .send({})
    //         .end((err, res)=>{
    //             res.should.have.status(200);
    //             res.body.should.be.an('object');
    //         })
    //     })
    //     it('should return an array of users', ()=>{
    //         chai.request("http://localhost:3000").post('/api/upload')
    //         .send({})
    //         .end((err, res)=>{
    //             res.should.have.status(200);
    //             res.body.should.have.property('result')
    //         })
    //     })
        
    // })

    describe('/createUser', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/createUser')
            .send({username: "inTest", email: "inTest@com.au", password: "inTest", role: "user", groups: [], adminGroupList:[], image:"", valid:false})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        it('should return false', ()=>{
            chai.request("http://localhost:3000").post('/createUser')
            .send({username: "inTest2", email: "inTest2@com.au", password: "inTest2", role: "user", groups: [], adminGroupList:[], image:"", valid:false})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        
    })
    describe('/removeUser', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/removeUser')
            .send({_id: ""})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        
        
    })
    describe('/getGroups', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/getGroups')
            .send({username: "super"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
            })
        })
        it('should return false', ()=>{
            chai.request("http://localhost:3000").post('/getGroups')
            .send({username: "super"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
            })
        })
        
    })
    describe('/createGroup', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/createGroup')
            .send({username: "super", name: 'inTest'})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        it('should return false', ()=>{
            chai.request("http://localhost:3000").post('/createGroup')
            .send({username: "super", name: 'test2'})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        it('should return false', ()=>{
            chai.request("http://localhost:3000").post('/createGroup')
            .send({username: "super", name: 'test4'})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        
    })
    describe('/removeGroup', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/removeGroup')
            .send({name: 'inTest'})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        it('should return true', ()=>{
            chai.request("http://localhost:3000").post('/removeGroup')
            .send({name: 'test2'})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        
    })
    describe('/createChannel', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/createChannel')
            .send({username: 'super', group: "Group 3", channel: "test3"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        it('should return false', ()=>{
            chai.request("http://localhost:3000").post('/createChannel')
            .send({username: 'super', group: "Group 3", channel: "test2"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        
    })
    describe('/removeChannel', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/removeChannel')
            .send({group: "Group 3", channel: "test3"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        it('should return true', ()=>{
            chai.request("http://localhost:3000").post('/removeChannel')
            .send({group: "Group 3", channel: "test2"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        
    })
    describe('/getCurrentUser', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/getCurrentUser')
            .send({username: "super"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
            })
        })
        it('should return true', ()=>{
            chai.request("http://localhost:3000").post('/getCurrentUser')
            .send({username: "super"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
            })
        })
        
    })
    describe('/inviteUser', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/inviteUser')
            .send({username: "super", group:"Group 2"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        it('should return false', ()=>{
            chai.request("http://localhost:3000").post('/inviteUser')
            .send({username: "super", group:"Group 2"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        
    })
    describe('/kickUser', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/kickUser')
            .send({username: "super", group:"Group 3"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        it('should return false', ()=>{
            chai.request("http://localhost:3000").post('/kickUser')
            .send({username: "super", group:"Group 3"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        
    })
    describe('/gGroupUsers', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/gGroupUsers')
            .send({group:"Group 2"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.an('object');
            })
        })
        it('should return false', ()=>{
            chai.request("http://localhost:3000").post('/gGroupUsers')
            .send({group:"Group 2"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.an('object');
            })
        })
        
    })
    describe('/addUserChannel', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/addUserChannel')
            .send({username: "super", group:"test4", channel: "test"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        it('should return false', ()=>{
            chai.request("http://localhost:3000").post('/addUserChannel')
            .send({username: "super", group:"test4", channel: "Fishing"})
            .end((err, res)=>{
                res.should.have.status(200);
                console.log(res.body)
                res.body.should.be.a('boolean');
            })
        })
        
    })
    describe('/rmUserFromChannel', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/rmUserFromChannel')
            .send({username: "super", group:"test4", channel: "test"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        it('should return false', ()=>{
            chai.request("http://localhost:3000").post('/rmUserFromChannel')
            .send({username: "super", group:"test4", channel: "Fishing"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        
    })
    describe('/createWithSuper', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/createWithSuper')
            .send({username: "inTest3", email: "inTest3@com.au", password: "inTest3", role: "user", groups: [], adminGroupList:[], image:"", valid:false})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        it('should return false', ()=>{
            chai.request("http://localhost:3000").post('/createWithSuper')
            .send({username: "inTest4", email: "inTest4@com.au", password: "inTest4", role: "user", groups: [], adminGroupList:[], image:"", valid:false})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.eql(false)
            })
        })
        
    })
    describe('/giveAssis', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/giveAssis')
            .send({username: "super", group: "Group 2"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        it('should return false', ()=>{
            chai.request("http://localhost:3000").post('/giveAssis')
            .send({username: "super", group: "Group 2"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        
    })
    describe('/giveSuper', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/giveSuper')
            .send({name: "super"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        it('should return false', ()=>{
            chai.request("http://localhost:3000").post('/giveSuper')
            .send({name: "super"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('boolean');
            })
        })
        
    })
    describe('/getChannels', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/getChannels')
            .send({group: "Group 2"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
            })
        })
        it('should return false', ()=>{
            chai.request("http://localhost:3000").post('/getChannels')
            .send({group: "Group 2"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
            })
        })
        
    })
    describe('/getUserGroups', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/getUserGroups')
            .send({username: "super"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
            })
        })
        it('should return false', ()=>{
            chai.request("http://localhost:3000").post('/getUserGroups')
            .send({username: "super"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
            })
        })
        
    })
    describe('/getUserGroupCh', ()=>{
        it('should return a boolean', ()=>{
            chai.request("http://localhost:3000").post('/getUserGroupCh')
            .send({username: "super", group: "Group 2"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
            })
        })
        it('should return false', ()=>{
            chai.request("http://localhost:3000").post('/getUserGroupCh')
            .send({username: "super", group: "Group 2"})
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
            })
        })
        
    })
})