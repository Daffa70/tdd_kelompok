const request = require("supertest");
const app = require("../app.js");

// const user = {
//     name: 'sabrina',
//     email: 'sabrina3@mail.com',
//     password: 'password123',
//     token: ''
// };

describe('Test /auth/whoami endpoint', () => {
    test('Fetch user berhasil : token di provide', async () => { 
        try {
            
            const res = await request(app)
                .post('/auth/whoami')
                .set('Authorization', user.token)

            console.log(res.body);    
            
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status', 'massage', 'data', 'token');
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe('fetch user success!');
            expect(res.body.data).toStrictEqual({ id: res.id, name: res.name, email: res.email });



        } catch (err) {
            expect(err).toBe('error'); // test gagal karena err != 'error'
            
        }
    })
})