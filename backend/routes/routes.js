const Router = require('koa-router')
const router = new Router()
const Users = require('../repository/users')
var ObjectId = require('mongoose').Types.ObjectId; 
users = new Users;

router.get('/getAllUsers', async(ctx, next) => {
    const result = await users.find({});
    ctx.body = result;
  });
router.get('/getUserById/:id', async(ctx, next) => {
    const result =  await users.findOne({_id:new ObjectId(ctx.params.id)});
    ctx.body = result;
  });
  router.post('/update/:id', (ctx, next) => {
    console.log(ctx.request.body);
    users.updateOne({_id:new ObjectId(ctx.params.id)},(ctx.request.body));
    ctx.body = {result: "ok"};
  });
  router.post('/create', (ctx, next) => {
    users.create((ctx.request.body));
    ctx.body = {result: "ok"};
  });
  router.get('/delete/:id', (ctx, next) => {
    users.deleteOne({_id:new ObjectId(ctx.params.id)});
    ctx.body = {result: "ok"};
  });
  router.get('/getManagerAndEmployees/:id', async(ctx, next) => {
    const result =  await users.findOne({_id:new ObjectId(ctx.params.id)}); 
    let employees = [];
    if(result._id){
        console.log("lets get employes!");
        resultEmp =  await users.find({manager:new ObjectId(ctx.params.id)});
        console.log("resultEmp",resultEmp); 
        employees = resultEmp;
    } 
    ctx.body = {manager: result, employees:employees};
  });

module.exports = router
