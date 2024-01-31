const request = require('supertest');
const app = require('../app');

let id;
let token;

beforeAll(async()=>{
    const credentials= {
        email: "test@gmail.com",
        password: "test123",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
})

test('GET /categories', async () => {
    const res = await request(app)
        .get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /categories', async () => {
    const category = {
       name: "smartphones"
    }
    const res = await request(app)
        .post('/categories')
        .send(category)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(category.name);
    expect(res.body.id).toBeDefined();
});


test('PUT /categories/:id', async () => {
    const categoryUpdated = {
        name: "tablets",
    }
    const res = await request(app)
        .put(`/categories/${id}`)
        .send(categoryUpdated)
        .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(categoryUpdated.name);
})

test('DELETE /categories/:id', async () => {
    const res = await request(app)
        .delete(`/categories/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
})