import mongoose from "mongoose";

const SubgreddiiitSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please provide name'],
    },
    imgPath: {
        type: String,
        default: "",
    },
    description:{
        type: String, 
        required: true,
    },
    tags:{
        type: Array,
        default: [],
    },
    bannedKeywords:{
        type: Array,
        default: []
    },
    moderators: {
        type: Array,
        default: [],
        ref: "User"
    },
    followers: {
        type: Array,
        default: [],
        ref: "User"
    },
    blockedFollowers: {
        type: Array,
        default: [],
        ref: "User",
    },
    joinRequests: {
        type:Array,
        default: [],
        ref: "User"
    },
    leftUsers:{
        type: Array,
        default: [],
        ref: "User",
    },
    visitors: {
        type: Array,
        default: [],
        ref: "User"
    },
    posts:{
        type: Array,
        default: [],
        ref: "Post",
    },
    reportedPosts:{
        type: "Array",
        default: [],
        ref: "Post",
    },
    creationDate: {
        type: Date,
        default: Date.now,
    }
},
{
    timestamps: true,
}
)
export default mongoose.model("Subgreddiiit", SubgreddiiitSchema);
