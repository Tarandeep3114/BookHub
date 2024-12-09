const express = require('express');
const bodyParser = require('body-parser');
const { fileAuth, generateJWT} = require('./auth');
const booksRouter = require('./routes/booksJWT');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// login route for existing users
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
   
    const user = fileAuth(username, password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    
   
    const token = generateJWT(username);
    res.json({ token });
});



// the books route
app.use('/books', booksRouter);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
