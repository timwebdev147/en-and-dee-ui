const BlogPost = require('../model/Blog')
const fs = require('fs');



const uploadPost = async (req, res) => {
    let filePath = fs.readFileSync("ui/public/upload/" + req.file.filename)
    var post = new BlogPost({
        title: req.body.title,
        body: req.body.body,
        image: {
            contentType: "image/jepg",
            data: filePath
        }
    });
    post.save();    
    res.json({ message: 'New image added to the db!', post });

}

const getPost = async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.pageNumber) || 0;
        const limit = parseInt(req.query.limit) || 12;
        const result = {};
        const totalPosts = await BlogPost.countDocuments().exec();
        let startIndex = pageNumber * limit;
        const endIndex = (pageNumber + 1) * limit;
        result.totalPosts = totalPosts;
        if (startIndex > 0) {
          result.previous = {
            pageNumber: pageNumber - 1,
            limit: limit,
          };
        }
        if (endIndex < (await BlogPost.countDocuments().exec())) {
          result.next = {
            pageNumber: pageNumber + 1,
            limit: limit,
          };
        }
        result.data = await BlogPost.find()
          .sort("-_id")
          .skip(startIndex)
          .limit(limit)
          .exec();
        result.rowsPerPage = limit;
        return res.json({ msg: "Posts Fetched successfully", result });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Sorry, something went wrong" });
      }
}

const getSinglePost = async (req, res) => {
    const post = await BlogPost.findById(req.params.id)
    if (!post) {
        return res.status(404).json({msg: `Post with ID: ${id} was not found`})
    };
    res.status(200).json(post)
}

module.exports = {uploadPost, getPost, getSinglePost};