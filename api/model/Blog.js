const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            
        },
        body: {
            type: String,
            
        },
        image: {
            contentType: String,
            data: Buffer
        }
    }
)

module.exports = mongoose.model('BlogPost', BlogSchema)