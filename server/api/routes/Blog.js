const express = require("express");
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');


router.post("/create",auth,blogController.createBlog);
router.put("/:id",auth,blogController.updateBlog);
// router.post("/:id",auth,blogController.updateBlog);
router.get("/",auth,blogController.listBlog);
router.get("/deleted",auth,blogController.listBlogdelete);
router.get("/:id",auth,blogController.detailBlog);
// router.get("/:slug",auth,blogController.detailBlog);
router.delete('/:id',auth,blogController.destroyBlog);

router.patch('/:id/restore',auth,blogController.restoreBlog);
router.delete('/:id/force',auth,blogController.forceDestroyBlog);
module.exports = router;
