const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Manage_blog',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
    console.log('connection successfully');
})

module.exports = db;