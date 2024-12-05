const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const countryRoutes = require('./routes/countryRoutes');
app.use('/api', countryRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
