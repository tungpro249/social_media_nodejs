import mongoose from "mongoose";

async function connect() {
    try {
        // @ts-ignore
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }

}

module.exports = { connect };