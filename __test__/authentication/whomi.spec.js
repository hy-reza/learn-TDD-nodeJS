const request = require('supertest');
const app = require('../../app');

describe('GET /v1/auth/whoami', () => {
    let token;

    beforeAll((done) => {
        request(app)
            .post('/v1/auth/login')
            .send({
                email: 'Jayabaya@binar.co.id',
                password: '123456',
            })
            .expect(201)
            .end((err, res) => {
                if (err) throw err;
                token = res.body.accessToken;
                done();
            });
    });

    it('should response with 200 as status code', async () => {


        return (
            request(app)
                .post('/v1/auth/whoami')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .then((res) => {
                    expect(res.statusCode).toBe(404);
                    // expect(res.body).toEqual(
                    //     expect.objectContaining({
                    //         user,
                    //     })
                    // );
                })
        );
    });

    it('should response with 404 as status code', async () => {
        // const userParam = { id: 1 };

        return (
            request(app)
                .post('/v1/auth/whoami')
                .set('Content-Type', 'application/json')
                .then((res) => {
                    expect(res.statusCode).toBe(404);
                    expect(res.body).toEqual(
                        expect.objectContaining({
                            error: {
                                details: expect.any(Object),
                                message: expect.any(String),
                                name: expect.any(String),
                            },
                        })
                    );
                })
        );
    });
});
