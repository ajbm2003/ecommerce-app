const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST /users', async () => {
    const user = {
        firstName: "Alejandro",
        lastName: "Benavides",
        email: "alejobenavides2003.2@gmail.com",
        password: "ale123",
        phone: "09999212"
    }
    const res = await request(app).post('/users').send(user);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(user.firstName);
    expect(res.body.id).toBeDefined();
});

test('POST /users/login', async () => {
    const credentials = {
        email: "alejobenavides2003.2@gmail.com",
        password: "ale123",
    }
    const res = await request(app).post(`/users/login`).send(credentials);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(credentials.email);
    expect(res.body.token).toBeDefined();
})

test('GET /users', async () => {
    const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/:id', async () => {
    const userUpdated = {
        firstName: "Javier",
    }
    const res = await request(app)
        .put(`/users/${id}`)
        .send(userUpdated)
        .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(userUpdated.firstName);
})

test('DELETE /users/:id', async () => {
    const res = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
})
