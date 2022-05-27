const { User } = require('../models')

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-_v',
            })
            .select('-_v')
            .sort({ id: -1 })
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-_v'
            })
            .select('-_v')
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
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
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
        User.findOneAndDelete({_id: params.id})
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
        User.findOneAndUpdate (
            {_id: params.id},
            {$addToSet: {friends: params.friendsId}},
            {new: true})
            .then(userData => res.json(userData))
            .catch((err) =>res.status(400).json(err));
    },

    // delete friend
    deleteFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.id},
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