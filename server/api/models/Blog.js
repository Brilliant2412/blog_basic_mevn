const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Blog = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId,ref: 'User'},
  title: { type: String },
  img: { type: String},
  content: {type: String},
  slug: { type: String, slug: 'title' , unique: true},
},{
  timestamps: true,
});

Blog.method("toJSON",function(){
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
})

mongoose.plugin(slug);
Blog.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all' ,
});

module.exports = mongoose.model('Blog',Blog);