const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: "-_v",
            })
            .populate({
                path: 'thoughts',
                select: '-_v',
            })
            .select('-_v')
            .then((thoughtData => res.json(thoughtData))
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                }))
    },
    // get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then((thoughtData) => {
                // if no data found
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought with this ID" });
                    return;
                }
                res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // post thought to user
    createThought({ body }, res) {
        console.log(body);
        Thought.create(body)
            .then((thoughtData) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: thoughtData._id } },
                    { new: true }
                );
            })
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: "No User with this ID" });
                    return;
                }
                res.json(userData)
            })
            .catch((err) => res.json(err));
    },
    // update thought using id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought with this ID" });
                    return;
                }
                res.json(thoughtData)
            })
            .catch((err) => res.status(400).json(err));

    },
    // delete Thought

    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then((thoughtData) => {
            if(!thoughtData) {
                res.status(404).json({ message: "No thought with this ID" });
          return;
            }
            res.json(thoughtData);
        })
        .catch((err) => res.status(400).json(err))

    },

    // add a reaction
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$addToSet: {reactions: body}},
            {new: true}
            )
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought with this id" });
                    return;
                  }
                  res.json(thoughtData);
            })
            .catch((err) => res.json(err));
    },

    // delete reaction
    deleteReaction({params}, res) {
        Thought.findOneAndDelete(
            {id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.json(err));
    }
};

module.exports = thoughtController;