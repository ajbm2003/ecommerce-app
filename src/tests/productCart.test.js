const request = require('supertest');
const app = require('../app');
require('../models');

let id;
let token;

beforeAll(async()=>{
    const credentials= {
        email: "test@gmail.com",
        password: "test123",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('GET /productCarts', async()=>{
    const res= await request(app)
        .get('/productCarts')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /productCarts', async()=>{
    const productCart= {
        quantity:2
    }
    const res =await request(app)
        .post('/productCarts')
        .send(productCart)
        .set('Authorization', `Bearer ${token}`);
    id= res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.quantity).toBe(productCart.quantity);
    expect(res.body.id).toBeDefined();
});

test('PUT /productCarts/:id', async () => {
    const productCartUpdated = {
        quantity:1,
    }
    const res = await request(app)
        .put(`/productCarts/${id}`)
        .send(productCartUpdated)
        .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(productCartUpdated.quantity);
})

test('DELETE /productCarts/:id', async () => {
    const res = await request(app)
        .delete(`/productCarts/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
})
