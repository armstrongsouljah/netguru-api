const request = require('supertest')
const { app } = require('../app')




describe('movie list API', () => {
    it('should fail with no authentication provided', async() => {
        const res = await request(app)
            .get('/movies')
            
        expect(res.statusCode).toBe(401)
    }, 30000)
})