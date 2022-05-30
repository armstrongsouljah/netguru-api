const request = require('supertest')
const jwt = require('jsonwebtoken');

const jwtVerifyResponseData = {
    "userId": 128,
    "name": "Basic User",
    "role": "basic",
    "iat": 1653937021,
    "exp": 1653938821,
    "iss": "https://www.server.com/",
    "sub": "123"
}


const app = require('../app');
const {connectDB, disconnectDB} = require('../database/index');

beforeAll(() => {
    connectDB();
})

afterAll(() => {
    disconnectDB();
})

describe('GET /movies/', () => {
    it('should fail with no authentication provided', async (done) => {
        // Mock
        jwt.verify = jest.fn().mockImplementationOnce(() => null)

        const res = await request(app)
            .get('/movies/')
        expect(res.statusCode).toBe(401)
        done()
    }, 30000)

    it('should fetch movies when logged in', async(done) => {
        jwt.verify = jest.fn().mockImplementationOnce(() => jwtVerifyResponseData);
        const res = await request(app)
            .get('/movies/')
        expect(res.statusCode).toBe(200)
        expect(res.body.movies.length).toBe(0)
        done()
    }, 3000)
})

describe('POST /movies', () => {
    it('should fail to create movie with no auth provided', async(done) => {
        const res = await request(app)
            .post('/movies/')
            .send({title: 'Rambo'})
            .set('Accept', 'application/json')
        expect(res.statusCode).toBe(401)
        done()
    }, 30000)

    it('should should fail to create a movie with bad auth provided', async(done) => {
        const res = await request(app)
            .post('/movies/')
            .send({title: 'Rambo'})
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer Jddedede.dededed.dede.ded.eded.eded.de')
        expect(res.statusCode).toBe(401)
        done()
    }, 30000)

    it('allows a basic user to create a movie', async(done) => {
        jwt.verify = jest.fn().mockImplementationOnce(() => jwtVerifyResponseData);
        const res = await request(app)
            .post('/movies/')
            .send({title: 'Tuxedo'})
            .set('Accept', 'application/json')
        expect(res.statusCode).toBe(200)
        done()
    })
})
