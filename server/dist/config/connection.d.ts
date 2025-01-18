import mongoose from 'mongoose';
declare const db: () => Promise<typeof mongoose.connection>;
export default db;
