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

test('GET /products', async()=>{
    const res= await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /products', async()=>{
    const product= {
        title: "Macbook pro",
        brand: "Apple",
        description: "Laptop de 14 pulgadas, 16 ram y 556gb almacenamiento",
        price: "2000"
    }
    const res =await request(app)
        .post('/products')
        .send(product)
        .set('Authorization', `Bearer ${token}`);
    id= res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(product.title);
    expect(res.body.id).toBeDefined();
});

test('PUT /products/:id', async () => {
    const productUpdated = {
        title: "Iphone 15 PRO MAX",
    }
    const res = await request(app)
        .put(`/products/${id}`)
        .send(productUpdated)
        .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe(productUpdated.title);
})

test('DELETE /products/:id', async () => {
    const res = await request(app)
        .delete(`/products/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
})