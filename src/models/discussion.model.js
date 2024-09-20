import mongoose, {Schema} from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const DiscussionSchema = new Schema(
    {
        title: {
            type: String,
            required: true
            },
        content: {
            type: String,
            required: true
        },
        
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)


// commentSchema.plugin(mongooseAggregatePaginate)

export const Discussion = mongoose.model("Discussion", DiscussionSchema)