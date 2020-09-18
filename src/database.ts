import mongoose from 'mongoose';

export default class Database {
    private host = process.env.HOST_DB || '127.0.0.1:27017';
    private db = process.env.DB || 'marvel';

    async connect() {
        mongoose
            .connect(`mongodb://${this.host}/${this.db}`)
            .then(() => {
                console.log('Database connection successful');
            })
            .catch((err) => {
                console.error(`Database connection error: ${err}`);
            });
    }
}
