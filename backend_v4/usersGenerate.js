const faker = require('faker');
const axios = require('axios');

const fakeMyData = num => {
    for(let n = 1; n <= num; n++) {
        const newUser = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            age: faker.random.number({min: 1, max: 99, precision: 1}),
            sex: faker.random.boolean() ? "male" : "female",
            password: faker.internet.password(10)
        };
        postUser(newUser);
    }
}

const postUser = user => {
    axios.post('http://localhost:3002/api/users/', user, {headers : {
        "Content-Type": "application/json"
    }}).then(res => console.log(res.data))
    .catch(err => console.log(err))
}

fakeMyData(100);