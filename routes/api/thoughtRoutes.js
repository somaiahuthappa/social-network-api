const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController')

// set up get and post for thoughts

router
.route('/')
.get(getAllThoughts)
.post(createThought);

// set up get, update and delete using id
router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

// set up add and delete reaction using thought id

router
.route('/:thoughtId/reactions')
.post(addReaction)
.delete(deleteReaction)

module.exports = router;
