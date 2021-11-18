const TodoModel = require('../model/todo.model')

exports.createTodo = async (req, res, next) => {
    try {
        const createdModel = await TodoModel.create(req.body)
        res.status(201).json(createdModel)
    } catch (err) {
        next(err)
    }
}

exports.getTodos = async (req, res, next) => {
    try {
        const allTodos = await TodoModel.find({})
        res.status(200).json(allTodos)
    } catch (err) {
        next(err)
    }
}

exports.getTodoById = async (req, res, next) => {
    try {
        const todoId = req.params.todoId
        const todoModel = await TodoModel.findById(todoId)

        if(!todoModel) {
            res.status(404).send()
            return
        }
            res.status(200).json(todoModel)
    } catch (err) {
        next(err)
    }
}

exports.updateTodo = async (req, res, next) => {
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            req.params.todoId,
            req.body, 
            {
                new: true,
                useFindAndModify: false
            }
        )

        if(!updatedTodo) {
            res.status(404).send()
            return
        }
        res.status(200).json(updatedTodo)
    } catch (err) {
        next(err)
    }
} 

exports.deleteTodo = async (req, res, next) => {
    try {
        const todoId = req.params.todoId
        const deletedTodo = await TodoModel.findByIdAndDelete(todoId)

        if(!deletedTodo) {
            res.status(404).send()
            return
        }
            res.status(200).json(deletedTodo)
    } catch (err) {
        next(err)
    }
}