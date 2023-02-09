const fs = require("fs");
const postModel = require("../models/post");

exports.getMainPage = async (req, res) => {
  const posts = await postModel.find({});

  res.status(200).render("index",{
		posts
	});
};

exports.createPost = async (req, res) => {
  const uploadDir = "public/uploads";
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir); // Bunun için const fs = require('fs'); almamız gerekir.

  let uploadeImage = req.files.photo;
  let uploadPath = __dirname + "/../public/uploads/" + uploadeImage.name;

  const portfolioInfo = {
    title: req.body.title,
    description: req.body.description,
    photo: uploadeImage.name,
  };

  uploadeImage.mv(uploadPath, async () => {
    await postModel.create(portfolioInfo);
    res.redirect("/");
  }); // adresine yönlendirioruz
};

exports.deletePost = async (req, res)=>{
	const post = await postModel.findOne({ _id: req.params.id });
  let deletedImage = __dirname + "/../public/uploads/" + post.photo;
  fs.unlinkSync(deletedImage);
  await postModel.findByIdAndRemove(req.params.id);
  res.redirect(`/`);
}
