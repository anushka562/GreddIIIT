import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    imgPath: {
        type: String,
        default: "",
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postedIn:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subgreddiiit"
    },
    upvotes:{
        type: Array,
        default: [],
    },
    downvotes:{
        type: Array,
        default: [],
    },        
    savedBy:{
        type:Array,
        default: [],
    },
    comments:{
        type: Array,
        default: [],
    }
},
{
    timestamps: true,
}
)

export default mongoose.model("Post", PostSchema);