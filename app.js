const express = require('express');
const app = express();
const mahasiswaRoutes = require('./routes/mahasiswa');

app.use(express.json());
app.use('/mahasiswa', mahasiswaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
}); 