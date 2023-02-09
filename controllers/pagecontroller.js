const fs = require("fs");
const postModel = require("../models/post");

exports.getMainPage = async (req, res) => {
  res.render("index");
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
