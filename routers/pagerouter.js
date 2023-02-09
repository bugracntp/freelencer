const express = require("express");

const pageController = require("../controllers/pagecontroller");

const router = express.Router();

router.route("/").get(pageController.getMainPage);
router.route("/postcreate").post(pageController.createPost);
router.route("/:id").delete(pageController.deletePost);


module.exports = router;
