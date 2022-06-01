const {Schema, model, Types} = require("mongoose");
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => dateFormat(createdAtValue)
        },
    },
    {
        toJson: {
            getters: true,
        },
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => dateFormat(createdAtValue)
        },
        username:{
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// get total count of reactions and replies on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create thought model
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
