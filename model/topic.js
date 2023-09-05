import mongoose, {Schema} from "mongoose";

const topicSchema = new Schema(
    {
        title: String,
        authors: String,
        source: String,
        pubyear: String,
        doi: String,
        claim: String, 
        evidence: String
    },
    {
        timestamps: true,
    }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;