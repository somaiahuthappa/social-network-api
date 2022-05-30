const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then((thoughtData) => res.json(thoughtData))
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })
    },
    // get thought by id
    getThoughtById({ params }, res) {
        Thought.findById(params.thoughtId)
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
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
        Thought.create(body)
            .then(({ _id }) => {
                return User.findByIdAndUpdate(
                    body.userId,
                    { $push: { thoughts: _id } },
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
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // update thought using id
    updateThought({ params, body }, res) {
        Thought.findByIdAndUpdate(params.thoughtId, body, { new: true, runValidators: true })
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought with this ID" });
                    return;
                }
                res.json(thoughtData)
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });

    },
    // delete Thought

    deleteThought({ params }, res) {
        Thought.findByIdAndDelete(params.thoughtId)
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought with this ID" });
                    return;
                }
                res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })

    },

    // add a reaction
    addReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(
            params.thoughtId,
            { $push: { reactions: body } },
            { new: true }
        )
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought with this id" });
                    return;
                }
                res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // delete reaction
    deleteReaction({ params, body }, res) {
        Thought.findByIdAndDelete(
            params.thoughtId,
            { $pull: { reactions: { reactionId: body.reactionId } } },
            { new: true }
        )
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought with this id" });
                    return;
                }
                res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    }
};

module.exports = thoughtController;