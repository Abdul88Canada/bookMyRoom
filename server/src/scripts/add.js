import mongoose from 'mongoose';
import City from '../models/City.js';
import Location from '../models/Location.js';
import Room from '../models/Room.js';

// Connect to MongoDB
mongoose.connect('mongodb+srv://User:12qw@cluster0.qbmrcts.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB Connected');
        insertData(); // Call the function here after connection is established
    })
    .catch((err) => console.log(err));

// Data to insert
const cities = [
    {
        name: 'Riyadh',
        locations: [
            {
                name: 'Kingdom Tower',
                rooms: [
                    {
                        name: 'Conference Room A',
                        capacity: 10,
                        amenities: ['WiFi', 'Projector'],
                        availableSlots: [
                            { day: 'Monday', slots: ['09:00-10:00', '10:00-11:00'] },
                            { day: 'Tuesday', slots: ['10:00-11:00', '11:00-12:00'] },
                        ],
                    },
                    {
                        name: 'Meeting Room B',
                        capacity: 6,
                        amenities: ['WiFi', 'Whiteboard'],
                        availableSlots: [
                            { day: 'Monday', slots: ['13:00-14:00', '14:00-15:00'] },
                            { day: 'Tuesday', slots: ['09:00-10:00', '11:00-12:00'] },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: 'Khobar',
        locations: [
            {
                name: 'Corniche Tower',
                rooms: [
                    {
                        name: 'Conference Room X',
                        capacity: 12,
                        amenities: ['WiFi', 'Video Conferencing'],
                        availableSlots: [
                            { day: 'Wednesday', slots: ['09:00-10:00', '11:00-12:00'] },
                            { day: 'Thursday', slots: ['10:00-11:00', '12:00-13:00'] },
                        ],
                    },
                    {
                        name: 'Meeting Room Y',
                        capacity: 8,
                        amenities: ['WiFi', 'Smart TV'],
                        availableSlots: [
                            { day: 'Wednesday', slots: ['14:00-15:00', '15:00-16:00'] },
                            { day: 'Thursday', slots: ['09:00-10:00', '13:00-14:00'] },
                        ],
                    },
                ],
            },
        ],
    },
];

// Insert data function
async function insertData() {
    try {
        for (const cityData of cities) {
            // Create city
            const city = new City({ name: cityData.name });
            await city.save();

            for (const locationData of cityData.locations) {
                // Create location
                const location = new Location({ name: locationData.name, city: city._id });
                await location.save();

                for (const roomData of locationData.rooms) {
                    // Create room
                    const room = new Room({
                        name: roomData.name,
                        location: location._id,
                        capacity: roomData.capacity,
                        amenities: roomData.amenities,
                        availableSlots: roomData.availableSlots,
                    });
                    await room.save();
                }
            }
        }

        console.log('Cities, locations, and rooms added successfully!');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    }
}
