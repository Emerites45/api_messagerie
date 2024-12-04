const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = 'mongodb://mongo:27017/messagerie';
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connecté avec succès');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;