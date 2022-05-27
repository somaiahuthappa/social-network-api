const router = require('express').Router();
const { get } = require('http');
// import destructured methods
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController')

// set up get all and post at /api/users

router
.route('/')
.get(getAllUsers)
.post(createUser)

// set up get one user, update and delete at /api/users/:id

router
.route('/:id')
get(getUserById)
.put(updateUser)
.delete(deleteUser)

// add and delete friend
router
.route('/:id/friends/:friendsId')
.post(addFriend)
.delete(deleteFriend)


module.exports = router;