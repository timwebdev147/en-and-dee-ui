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
    const posts = await BlogPost.find()
    res.status(200).json(posts)
}

const getSinglePost = async (req, res) => {
    const post = await BlogPost.findById(req.params.id)
    if (!post) {
        return res.status(404).json({msg: `Post with ID: ${id} was not found`})
    };
    res.status(200).json(post)
}

module.exports = {uploadPost, getPost, getSinglePost};