const supertest = require('supertest');
const host = 'http://localhost:3000';
const request = supertest(host);

let token;



describe('CREATE USER', () => {
    it('should create a user', async () => {
        const response = await request.post('/api/v1/users')
        .send(
            {
                name : "user",
                email : "user@gmail.com",
                password : "user123"
            }
        )
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual('User registered with success');
        expect(response.type).toBe('application/json');
    })
})

describe('USER ALREADY REGISTERED', () => {
    it('should create a user', async () => {
        const response = await request.post('/api/v1/users')
        .send(
            {
                name : "user",
                email : "user@gmail.com",
                password : "user123"
            }
        )
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual('User already registered');
        expect(response.type).toBe('application/json');
    })
})



describe('AUTHENTICATE USER', () => {
    it('should authenticate a user', async () => {
        const response = await request.post('/api/v1/auth')
        .send(
            {
                email : "user@gmail.com",
                password : "user123"
            }
        )
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');

        token = response.body.token;

    })
})

describe('INCORRECT DATA', () => {
    it('should authenticate a user', async () => {
        const response = await request.post('/api/v1/auth')
        .send(
            {
                email : "ahmadelturky98@gmail.com",
                password : "user123"
            }
        )
        expect(response.statusCode).toBe(401);
        expect(response.type).toBe('application/json');
        expect(response.body.message).toEqual('Incorrect email or password');

    

    })
})



  describe('GET USER BY TOKEN', () => {
    it('should get a user', async () => {
        return await request.get('/api/v1/users')
        .set('Authorization', token)
        .then((response) =>{
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
            //expect(response.body.id).toBe(46643);
            //expect(response.body.name).toEqual('user');
            expect(response.body.email).toEqual('user@gmail.com');
            expect(response.body.password).toEqual('user123');
            expect(response.body.imageUrl).toEqual('https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg');
        })
    })
 })

 describe('UNAUTHORIZED GET', () => {
    it('should get a user', async () => {
        const token = "123";
        return await request.get('/api/v1/users')
        .set('Authorization', token)
        .then((response) =>{
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toEqual('Unauthorized');
        })
    })
 })

 describe('PATCH USER BY TOKEN', () => {
    it('should patch a user', async () => {
        const response = await request.patch('/api/v1/users')
        .set('Authorization', token)
        .send({
            name: "newName",
            email : "new_email@gmail.com",
            password : "newpassword123"
        })
        expect(response.body.message).toEqual('User updated with success!');
    })
 })

 describe('PATCH USER BY WRONG TOKEN', () => {
    it('should patch a user', async () => {
        const token ="123";
        const response = await request.patch('/api/v1/users')
        .set('Authorization', token)
        .send({
            name: "newName",
            email : "new_email@gmail.com",
            password : "newpassword123"
        })
        expect(response.statusCode).toBe(403);
    })
 })

 describe('AUTHENTICATE USER', () => {
    it('should authenticate a user', async () => {
        const response = await request.post('/api/v1/auth')
        .send(
            {
                email : "new_email@gmail.com",
                password : "newpassword123"
            }
        )
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');

        token = response.body.token;

    })
})

 describe('DELETE USER BY TOKEN', () => {
    it('should delete a user', async () => {
        const response = await request.delete('/api/v1/users')
        .set('Authorization', token)


        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual('User deleted with success!');
    })
 })

 describe('DELETE USER BY WRONG TOKEN', () => {
    it('should delete a user', async () => {
        const token = "134"
        const response = await request.delete('/api/v1/users')
        .set('Authorization', token)


        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual('Unauthorized to delete');
    })
 })

 describe('DELETE ALL USERS', () => {
    it('should delete a user', async () => {
        const response = await request.delete('/api/v1/all-users')
        .send(
            {
                key_admin : "keyadmin123"
            }
        )


        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual('Users deleted with success');
    })
 })

 describe('DELETE ALL USERS BY WRONG KEY', () => {
    it('should delete a user', async () => {
        const response = await request.delete('/api/v1/all-users')
        .send(
            {
                key_admin : "key123"
            }
        )


        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual('Unauthorized access');
    })
 })