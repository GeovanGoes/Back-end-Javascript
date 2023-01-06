import mongoose from "mongoose"

mongoose.connect("mongodb+srv://goes-2-mongo-db:goes-2-mongo-db@cluster0.6lq5hjd.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;