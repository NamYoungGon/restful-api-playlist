const express = require('express')
const router = express.Router()
const User = require('./../models/user')

// list
router.get('/user', (req, res, next) => {
    User.find({}).then((users) => {
        res.send(users)
    })
})

// new
router.post('/user', (req, res, next) => {
    // const { name, rank, available } = req.body

    // const user = new User({ name, rank })
    // user.save()

    User.create({ ...req.body }).then((user) => {
        res.send(user)
    }).catch(next)
})

// update
router.put('/user/:id', (req, res, next) => {
    const { id } = req.params

    // User.findByIdAndUpdate({ _id: id }, { ...req.body }).then((user) => {
    //     res.send(user)
    // })

    // 위와 같이 할 경우 결과 값이 수정 전 값이 나오므로
    // 수정 후 다시 검색 후 결과값을 반환한다.
    User.findByIdAndUpdate({ _id: id }, { ...req.body }).then(() => {
        User.findOne({ _id: id }).then((user) => {
            res.send(user)
        })
    })
})

// delete
router.delete('/user/:id', (req, res, next) => {
    const { id } = req.params
    User.findByIdAndRemove({ _id: id }).then((user) => {
        res.send(user)
    })
})

module.exports = router