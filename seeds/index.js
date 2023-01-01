const mongoose = require('mongoose');
const Campdata = require('../models/CampModel');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

// 몽구스 연결해주는 부분. 비밀번호 문제로 깃에 올릴때는 삭제해둠.

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random()*array.length)];

async function seedDB() {
    await Campdata.deleteMany({});
    for(let i=0 ; i<30 ; i++) {
        const ran = Math.floor(Math.random()*100);
        const randomPrice = (Math.random() * 10) + 100;
        const data = new Campdata({
            location:`${cities[ran].city} ${cities[ran].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            price: randomPrice,
            image: `https://images.unsplash.com/photo-1670272505497-d532f0b50702?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80`,
            description: `UUnsplash is a website dedicated to proprietary stock photography.`,
        })
        await data.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})




