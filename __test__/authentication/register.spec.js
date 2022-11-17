const request = require('supertest');
const app = require('../../app');
const { faker } = require('@faker-js/faker');
// const { User, sequelize } = require('../../app/models');

describe('POST /v1/auth/register', () => {
    const requestBody = {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };

    it('should respound with 201 Authorized as status code and return token', () => {
        return request(app)
            .post('/v1/auth/register')
            .set('Content-Type', 'application/json')
            .send({ ...requestBody })
            .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        accessToken: expect.any(String),
                    })
                );
            });
    });
});
