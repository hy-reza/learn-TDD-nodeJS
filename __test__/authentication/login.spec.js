const request = require('supertest');
const app = require('../../app');

describe('POST /v1/auth/login', () => {
    it('should respound 201 as status code when user successfully login', async () => {
        const email = 'Jayabaya@binar.co.id';
        const password = '123456';
        return request(app)
            .post('/v1/auth/login')
            .set('Content-Type', 'application/json')
            .send({ email, password })
            .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        accessToken: expect.any(String),
                    })
                );
            });
    });

    it('should respound 404 as status code when user not found', async () => {
        const email = 'salah@binar.co.id';
        const password = 'gaada';
        return request(app)
            .post('/v1/auth/login')
            .set('Content-Type', 'application/json')
            .send({ email, password })
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
            });
    });

    it('should response 401 as status code when email or password is incorrect', async () => {
        const email = 'Jayabaya@binar.co.id';
        const password = 'salah';
        return request(app)
            .post('/v1/auth/login')
            .set('Content-Type', 'application/json')
            .send({ email, password })
            .then((res) => {
                expect(res.statusCode).toBe(401);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        error: {
                            details: expect.any(Object),
                            message: expect.any(String),
                            name: expect.any(String),
                        },
                    })
                );
            });
    });
});
