const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
    it('it should respound with 200 OK status code', (done) => {
        request(app)
            .get('/')
            .then((res) => {
                expect(res.body.status).toBe('OK');
                expect(res.statusCode).toBe(200);
                done();
            });
    });

    it('it should send a message', (done) => {
        request(app)
            .get('/')
            .then((res) => {
                expect(res.body.message).toBe('BCR API is up and running!');
                done();
            });
    });
});
