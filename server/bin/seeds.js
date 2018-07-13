require("dotenv").config();

const mongoose = require('mongoose');
const Charity = require('../models/charity')

const dbName = 'RaiseUp';
const mongoUri = process.env.MONGODB_URI || `mongodb://localhost/${dbName}`;

// connect to the database
mongoose.connect(mongoUri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to the database (${mongoUri})`);
});

Charity.collection.drop();
// Book.collection.drop();

setTimeout(function() {
  const charities = [
    new Charity({
      name:"RSPCA Victoria",
      sector: "Environment/ Animals",
      pictureUrl: "https://probonoaustralia.com.au/wp-content/uploads/2016/01/rspcavic-300x87.jpg",
      website: "http://rspcavic.org/",
      description:"The primary objectives of the RSPCA are the prevention of cruelty to animals and animal rehabilitation by: Educating the community regarding the humane  treatment and management of animals, and increasing public awareness of and support of animal welfare; Enforcing the existing laws to prevent cruelty to animals; Influencing the amendment or development of legislation and standards considered necessary for the protection and welfare of animals;  Encouraging and providing a sustainable, needs based network of animal welfare services across the State, for the care, shelter, treatment, rehabilitation, and protection of animals within the capacity and strategic directions of the  organisation; Providing relief programs to assist people within the community  who are experiencing adverse circumstances, to enable them to care for or manage their animals.",
    }),
    new Charity({
      name:"Melbourne City Mission",
      sector: "Social Services",
      pictureUrl: "https://probonoaustralia.com.au/wp-content/uploads/2016/01/mcm_horizontal_cmyk-300x139.png",
      website: "http://melbournecitymission.org.au",
      description:`Our Mission

      We help people and communities to develop their pathways away from disadvantage.
      Our Values
      
      1) We see the whole person
      
      We see the whole person, not just the barrier or issue they face. In other words we believe that most people have the ability to overcome whatever it is they are dealing with. Given the right support, the right opportunities and chances, most people have the ability to make positive change in their lives — and achieve a better future for themselves and their families.
      
      2) We give people a hand up
      
      We offer resources and choices that open up opportunities and build independence. It’s about providing the right support at the right time, so those living with deep disadvantage and exclusion can make positive change in their lives.
      
      3) We are inclusive
      
      We respect the beliefs of all those we work with; we include everyone regardless of their background, socio-economic status or country of origin; and we are supportive of cultural heritage. While we respect these beliefs and backgrounds and work hard to accommodate everyone at every turn, our focus is very much on a person’s welfare, their future and what we can offer to contribute to this.
      Our Goals
      
      At Melbourne City Mission, we have bold ambitions to make an even bigger difference. By 2022, we aim to double our size and double our impact. We’ll be changing many more lives in many more places to meet increasing demand for social services. We’ll have a louder voice in our sector and community. And we’ll foster more innovation to support people to achieve even better outcomes.
      Our Services
      
      Melbourne City Mission operates programs and services in the following areas:
      
          Education and Early Years Services
          Disability Services
          Social Enterprise
          Homelessness Services
          Justice Programs
          Palliative Care
          `,
    }),
    new Charity({
      name:"Heart Foundation",
      sector: "Health",
      pictureUrl: "https://probonoaustralia.com.au/wp-content/uploads/2009/12/HF-logo-CMYK-Custom-Optimized.jpg",
      website: "www.heartfoundation.org.au",
      description:`
      Our Mission / Objective
      
      Our Vision: For Australians to have the best cardiovascular health in the world. Our Mission: To reduce suffering and death from heart, stroke and blood vessel disease in Australia.
      Our Beneficiaries
      
      All Australians.
      `,
    }),
    new Charity({
      name:"Walter and Eliza Hall Institute of Medical Research",
      sector: "Education & Research",
      pictureUrl: "https://probonoaustralia.com.au/wp-content/uploads/2016/01/wehi_logo_web_2015-300x73.jpg",
      website: "www.heartfoundation.org.au",
      description:`
      
        Our Mission / Objective

        Our Mission:

        Mastery of Disease Through Discovery

        Our Vision:

        To be an innovative medical research institute that engages and enriches society and improves health outcomes through discovery, translation and education.

        Key Objectives:

        Discoveries: to make discoveries in medical biology that shape contemporary thinking and paradigms and enhance the understanding and treatment of disease.

        Translation: to convert our discoveries into improvements in disease diagnosis, prevention and treatment.

        Education: to develop and enrich the skills and experience of students and staff, allowing each person to realise their potential and contribute to a vibrant campus.

        Engagement: to engage with the community and develop support for medical research generally and institute’s mission specifically.

        Sustainability: to build an infrastructure, funding and research capacity that enables the institute to fulfil its mission in a sustainable manner.

      `
    })
  ];

  // let books = [
  //   new Book({
      
  //   }),
  //   new Book({
      
  //   }),
  //   new Book({
      
  //   })
  // ];

  // for (let i = 0; i < books.length; i++) {
  //   charities[3].books.push(books[i]._id);
  //   books[i].save();
  // }

  for (let i = 0; i < charities.length; i++) {
    charities[i].save();
  }
}, 1000);

setTimeout(function() {
  console.log("seeds have grown")
  mongoose.connection.close();
}, 3000);
