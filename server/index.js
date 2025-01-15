import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import stockRoutes from './routes/stocks.js';

dotenv.config(); // Ensure this is called at the top

const app = express();
const connectionString = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/stocks', stockRoutes);

app.get('/', (req, res) => {
    res.send('Hello to Smartfolio');
});

if (!connectionString) {
    console.error('CONNECTION_URL is not defined in the environment variables.');
    // console.error(error.message);
    process.exit(1);
}

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });