
const bcrypt = require('bcrypt');

async function checkPassword(plaintextPassword, hashedPassword) {
  try {
    const hashedPasswordaaa = await bcrypt.hash('aaaa', 10);
    console.log(hashedPasswordaaa)
    const match = await bcrypt.compare(plaintextPassword, hashedPassword);
    console.log('Password match:', match); // This will log true or false
  } catch (error) {
    console.error('Error comparing passwords:', error);
  }
}

// Call the function with your plaintext password and hashed password
checkPassword('bbbb', '$2b$10$axdE3LocrVcNN/lLEqakQeC5LU.soTzycnXQci6DQ.hThlHFN5z3q');
