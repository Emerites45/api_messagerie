const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = 'mongodb://localhost:27017/messagerie';
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });


       /* const collections = await mongoose.connection.db.listCollections().toArray();

        // Supprimer tous les documents dans chaque collection
        for (const collection of collections) {
            await mongoose.connection.db.collection(collection.name).deleteMany({});
            console.log( `Collection ${collection.name} vidée`);
        }*/

        console.log('MongoDB connecté avec succès');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;