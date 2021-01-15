const userRouter = require('./User');
const blogRouter = require('./Blog');

function route(app){
    app.use('/user',userRouter);
    app.use('/api/blog',blogRouter);
}

module.exports = route;
