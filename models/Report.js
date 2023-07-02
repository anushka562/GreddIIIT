import mongoose from 'mongoose'

const ReportSchema = new mongoose.Schema({
    reportedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    reportedUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    concern:{
        type: String,
        required: true,
    },
    reportedPost:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    reportedSubgreddiiit:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subgreddiiit",
    },
    ignored:{
        type: Boolean,
        default: false,
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Report", ReportSchema);