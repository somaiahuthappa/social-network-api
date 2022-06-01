const router = require('express').Router();

// import destructured methods
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// set up get all and post at /api/users

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// set up get one user, update and delete at /api/users/:id

router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// add and delete friend
router
    .route('/:userId/friends/:friendsId')
    .post(addFriend)
    .delete(deleteFriend);


module.exports = router;