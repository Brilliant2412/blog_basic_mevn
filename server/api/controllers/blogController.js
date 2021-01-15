const Blog = require("../models/Blog");
const sharp = require("sharp");
const User = require("../models/User");

//Create a post
//POST - /api/posts/create
exports.createBlog = async (req, res) => {
  const user = await User.findOne({
    username: req.body.author,
  });
  if (!user.username) {
    return res.status(400).json({
      err: "User not found",
    });
  } else {
    const imagebase64 = req.body.image;
    if (imagebase64) {
      const [typeString, imgStringBuffer] = imagebase64.split(";base64,");
      const matchType = typeString.match(/^data:image\/(png|jpe?g)$/);
      if (matchType) {
        var type = matchType[1];
        const imgBuffer = Buffer.from(imgStringBuffer, "base64");
        var imgName = Date.now() + "." + type;
        sharp(imgBuffer).toFile("uploads/" + imgName);
      }
      var imgNameOfBlog = "http://localhost:8081/uploads/" + imgName.toString();

      const blog = new Blog({
        author: user._id,
        title : req.body.title,
        content : req.body.content,
        img : imgNameOfBlog,
      })

      blog.populate('author').execPopulate();

      blog
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Done upload!",
          blog: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          err: err,
        });
      });
    }
  }
};

// Update a post
// PUT - /api/posts/:id
exports.updateBlog = (req, res) => {
  Blog.findById(req.params.id)
    .populate({ path: "author" })
    .exec()
    .then((blog) => {
      const imagebase64 = req.body.img;
      const [typeString, imgStringBuffer] = imagebase64.split(";base64,");
      const matchType = typeString.match(/^data:image\/(png|jpe?g)$/);
      if (matchType) {
        var type = matchType[1];
        const imgBuffer = Buffer.from(imgStringBuffer, "base64");
        var imgName = Date.now() + "." + type;
        blog.img = "http://localhost:8081/uploads/" + imgName.toString();
        sharp(imgBuffer).toFile("uploads/" + imgName);
        req.body.img = "http://localhost:8081/uploads/" + imgName.toString();
        Blog.updateOne({ _id: req.params.id }, req.body)
          .then(() => {
            console.log("success");
            return res.status(201).json({
              message: "update blog successfully!",
            });
          })
          .catch((err) => {
            res.status(500).json({
              err: err,
            });
          });
      } else {
        console.log("Invalid type!");
        return res.status(400).json({
          err: "Invalid type!",
        });
      }
    });
};

// List all posts
// GET - /api/posts/
exports.listBlog = (req, res) => {
  Blog.find({author: req.user._id})
    .populate({path: 'author',})
    .exec((err, blogs) => {
      if (err) {
        return res.status(500).json({
          err: err,
        });
      } else {
        res.status(201).json({
          blogs: blogs,
        });
      }
    });
};
exports.listBlogdelete = (req, res) => {
  Blog.findDeleted({author: req.user._id})
    .populate({ path: "author" })
    .exec((err, blogs) => {
      if (err) {
        return res.status(500).json({
          err: err,
        });
      } else {
        res.status(201).json({
          blogs: blogs,
        });
      }
    });
};

// Soft delete blog
// [DELETE]/blogs/:id
exports.destroyBlog = (req, res) => {
  Blog.delete({ _id: req.params.id })
    .populate({ path: "author" })
    .exec()
    .then(() =>
      res.status(201).json({
        message: "soft delete successfully",
      })
    )
    .catch((err) => {
      res.status(500).json({
        err: "Cannot delete",
      });
    });
};

// [DELETE]/blogs/:id/force
exports.forceDestroyBlog = (req, res) => {
  Blog.deleteOne({ _id: req.params.id })
    .populate({ path: "author" })
    .exec()
    .then(() =>
      res.status(201).json({
        message: "hard delete successfully",
      })
    )
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};

exports.restoreBlog = (req, res) => {
  Blog.restore({ _id: req.params.id })
    .populate({ path: "author" })
    .exec()
    .then((result) =>
      res.status(201).json({
        blog: result,
        message: "restored successfully",
      })
    )
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};

// detail
exports.detailBlog = (req, res) => {
  Blog.findById(req.params.id)
    .populate({ path: "author" })
    .exec()
    .then((blog) => {
      if (!blog) {
        res.status(404).json({
          message: "Not found",
        });
      } else {
        res.status(200).json({
          blog,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};
