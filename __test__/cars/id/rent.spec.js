const request = require('supertest');
const app = require('../../../app');
const { Car } = require('../../../app/models');
const { faker } = require('@faker-js/faker');

describe('POST /v1/cars/:id/rent', () => {
    let token;
    beforeAll((done) => {
        request(app)
            .post('/v1/auth/login')
            .send({
                email: 'jayabaya@binar.co.id',
                password: '123456',
            })
            .expect(201)
            .end((err, res) => {
                if (err) throw err;
                token = res.body.accessToken;
                done();
            });
    });

    let car;
    beforeEach(async () => {
        car = await Car.create({
            name: faker.lorem.sentence(),
            price: 100000,
            size: 'Sedan',
            image: 'https://source.unsplash.com/505x505',
            isCurrentlyRented: false,
        });
        return car;
    });

    it('should response with 201 as status code', async () => {
        const rentStartedAt = new Date();
        const rentEndedAt = new Date();

        return request(app)
            .post(`/v1/cars/${car.id}/rent`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({ rentStartedAt, rentEndedAt })
            .then((res) => {
                expect(res.statusCode).toBe(201);
            });
    });

    it('should respound rent information', async () => {
        const rentStartedAt = new Date();
        const rentEndedAt = new Date();

        return request(app)
            .post(`/v1/cars/${car.id}/rent`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({ rentStartedAt, rentEndedAt })
            .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        carId: expect.any(Number),
                        createdAt: expect.any(String),
                        id: expect.any(Number),
                        rentEndedAt: expect.any(String),
                        rentStartedAt: expect.any(String),
                        updatedAt: expect.any(String),
                        userId: expect.any(Number),
                    })
                );
            });
    });
});
