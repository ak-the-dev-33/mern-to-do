const bcrypt = require('bcryptjs');

const plainTextPwd = 'testpassword';

bcrypt.hash(plainTextPwd, 5, (err, hash)=>{
    if(err) throw err;

    console.log("Hashed Password:", hash);
}) 