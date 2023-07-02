import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true,
    },
    commentedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    commentedIn:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    likes:{
        type: Array,
        default: [],
    },    
},
{
    timestamps: true,
}
)

export default mongoose.model("Comment", CommentSchema);