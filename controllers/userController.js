const { User, Thought } = require('../models')

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .sort({ id: -1 })
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get user by id
    getUserById({ params }, res) {
        User.findById(params.userId)
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create User
    createUser({ body }, res) {
        // destructured body from req object
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err))
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findByIdAndUpdate(params.userId, body, { new: true, runValidators: true })
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // delete a user
    deleteUser({params}, res) {
        User.findByIdAndDelete(params.userId)
        .then((userData) => {
            if(!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                    return;
            }
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    
    // add a friend
    addFriend({params}, res) {
        User.findByIdAndUpdate (
            params.userId,
            {$push: {friends: params.friendsId}},
            {new: true})
            .then(userData => res.json(userData))
            .catch((err) =>res.status(400).json(err));
    },

    // delete friend
    deleteFriend({params}, res) {
        User.findByIdAndUpdate(
            params.userId,
            {$pull: {friends: params.friendsId}},
            {new:true})
            .then((userData) => {
                if(!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                        return;
                }
                res.json(userData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }

}

module.exports = userController;