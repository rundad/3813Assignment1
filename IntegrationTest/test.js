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
        
    })
})