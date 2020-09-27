import mongoose from 'mongoose';
import mongoConfig from './mongo';

export default class Database {
    async connect() {
        mongoose
            .connect(`mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
            .then(() => {
                console.log(
                    `Database connection successful mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`,
                );
            })
            .catch((err) => {
                console.error(`Database connection error: ${err}`);
            });
    }

    async close() {
        mongoose.connection.close();
    }
}
