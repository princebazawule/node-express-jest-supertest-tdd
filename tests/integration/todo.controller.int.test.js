const { TestWatcher } = require('jest')
const request = require('supertest')
const app = require('../../app')
const newTodo = require('../mock-data/new-todo.json')

const endpointUrl = '/todos/'
let firstTodo, newTodoId
const nonExistentId = '611f26ffa1d33e6da9962123'
const testData = {title: 'testing data', done: true}

describe(endpointUrl,() => {
    test('GET' + endpointUrl, async () => {
        const response = await request(app)
        .get(endpointUrl)
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body[0].title).toBeDefined()
        expect(response.body[0].done).toBeDefined()
        firstTodo = response.body[0]
    })

    test('GET by Id' + endpointUrl + ':todoId', async () => {
        const response = await request(app)
        .get(endpointUrl + firstTodo._id)
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toBe(firstTodo.title)
        expect(response.body.done).toBe(firstTodo.done)
    })

    test('GET 404' + endpointUrl + ':todoId', async () => {
        const response = await request(app)
        .get(endpointUrl + nonExistentId)
        expect(response.statusCode).toBe(404)
    })

    it('POST' + endpointUrl, async () => {
        const response = await request(app)
        .post(endpointUrl)
        .send(newTodo)
        expect(response.statusCode).toBe(201)
        expect(response.body.title).toBe(newTodo.title)
        expect(response.body.done).toBe(newTodo.done)
        newTodoId = response.body._id
    })

    it('PUT' + endpointUrl, async () => {
        const response = await request(app)
        .put(endpointUrl + newTodoId)
        .send(testData)
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toBe(testData.title)
        expect(response.body.done).toBe(testData.done)
    })

    it('PUT 404' + endpointUrl, async () => {
        const response = await request(app)
        .put(endpointUrl + nonExistentId)
        .send(testData)
        expect(response.statusCode).toBe(404)
    })

    it('DELETE' + endpointUrl, async () => {
        const response = await request(app)
        .put(endpointUrl + newTodoId)
        .send()
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toBe(testData.title)
        expect(response.body.done).toBe(testData.done)
    })

    it('DELETE 404' + endpointUrl, async () => {
        const response = await request(app)
        .put(endpointUrl + nonExistentId)
        .send()
        expect(response.statusCode).toBe(404)
    })

    it('should return error 500 when malformed data with POST' + endpointUrl, async () => {
        const response = await request(app)
        .post(endpointUrl)
        .send({title: 'missing done property'})
        expect(response.statusCode).toBe(500)
        expect(response.body).toStrictEqual({
            message: 'Todo validation failed: done: Path `done` is required.'
        })
    })
})