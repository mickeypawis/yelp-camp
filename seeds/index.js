const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.log.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('Database connected')
});

const sample = (array) => array[Math.floor(Math.random()* array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i = 0; i<50; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author:'64396cb8bfe4254b74f6ba3a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem reprehenderit, autem assumenda, voluptates, harum magnam expedita ad quod consectetur est nemo ratione provident libero recusandae suscipit ducimus dolorem vel dignissimos.',
            price,
            geometry:{
              type: "Point",
              coordinates:[
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images:[
                {
                  url: 'https://res.cloudinary.com/dmvgamj86/image/upload/v1681584162/YelpCamp/c6pw3kopp1j8yia2jbat.jpg',
                  filename: 'YelpCamp/c6pw3kopp1j8yia2jbat'
                },
                {
                  url: 'https://res.cloudinary.com/dmvgamj86/image/upload/v1681584189/YelpCamp/nuqbq1gxvb0gklvu1nwg.jpg',
                  filename: 'YelpCamp/nuqbq1gxvb0gklvu1nwg'
                }
              ]
        })
        await camp.save();
    }
}

seedDB();