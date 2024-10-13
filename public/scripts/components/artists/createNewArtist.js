const ArtistProfile = require('../../../../models/ArtistProfile');
const User = require('../../../../models/User');

// Assuming you have a user object
const user = new User({
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    password: 'password',
});

user.save((err) => {
    if (err) {
        console.log(err);
    } else {
        const artistProfile = new ArtistProfile({
            user: user._id,
            profilePicture: 'https://example.com/profile-picture.jpg',
            coverPicture: 'https://example.com/cover-picture.jpg',
            bio: 'This is my bio.',
            location: 'New York',
            website: 'https://example.com',
            socialMedia: {
                instagram: 'https://instagram.com/johndoe',
                facebook: 'https://facebook.com/johndoe',
                twitter: 'https://twitter.com/johndoe',
                youtube: 'https://youtube.com/johndoe',
                soundcloud: 'https://soundcloud.com/johndoe',
            },
            genre: 'Rock',
            musicStyle: 'Alternative',
            instruments: ['Guitar', 'Drums'],
            discography: [
                {
                    title: 'Album 1',
                    releaseDate: new Date('2020-01-01'),
                    genre: 'Rock',
                    description: 'This is my first album.',
                },
            ],
            upcomingShows: [
                {
                    date: new Date('2022-01-01'),
                    location: 'New York',
                    venue: 'Madison Square Garden',
                    description: 'This is my upcoming show.',
 },
            ],
        });

        artistProfile.save((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Artist profile created successfully!');
            }
        });
    }
});
