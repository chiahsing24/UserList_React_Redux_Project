const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'User must have a first name.'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'User must have a last name.'],
        trim: true
    },
    sex: {
        type: String,
        required: [true, 'User must have a gender, male or female.'],
        trim: true,
        enum: {
            values: ['male', 'female'],
            message: 'Gender is either: male, female'
        }
    },
    age: {
        type: Number,
        required: [true, 'User must have age.'],
        min: [1, 'Age must be greater than or equal to 1'],
        max: [100, 'Age must be less than or equal to 100']
    },
    password: {
        type: String,
        required: [true, 'User must have a password.'],
        trim: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;


// const testUser = new User({
//     firstName: 'Anthony',
//     lastName: 'Daivs',
//     sex: 'male',
//     age: 29,
//     password: 'GoLakers'
// });

// testUser.save().then(doc => {
//     console.log(doc);
// }).catch(err => {
//     console.log('ERROR: ', err);
// })