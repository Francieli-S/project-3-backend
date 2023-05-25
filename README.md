eventHorizon

Description:
A Full-stack MERN (MongoDB/Express/React/Node) application designed to allow users to post about music events happening in their area. These can be seen by other users. There is also a social media type of interaction, with users being able to comment on event posts made by other users.

User Stories
• Signup: As an anon I can sign up in the platform so that I can start creating and managing my backlog
• Login: As a user I can login to the platform so that I can start creating and managing my backlog
• Logout: As a user I can logout from the platform so no one else can modify my information
• Check profile: As a user I can check my profile
• Add elements: As a user I can add elements to my backlog
• Delete elements: As a user I can delete elements from my backlog
• Update elements: As a user I can update event elements in my backlog

Backlog:
• Google Maps locator
• Date Selector
• API for events/gigs
• Like/Favourite function

Client side ----
Routes
• / - Homepage
• /auth/signup - Signup form
• /auth/login - Login form
• /profile - Profile page
• /event/event-list - All users events
• /event/event-my - Events specifically created by the logged in user
• /event/event-one/:eventId - Page displaying details of one event
• /event/event-create - Form used to create events
• /event/event-update/:eventId - Form used to update event details
• /comment/comment-create - Form used to create comments

Pages:
• HomePage (public)
• Log in page (public)
• Sign in page (public)
• Profile (Logged in only)
• Event list (all users events) (Logged in only)
• My Events (Events specifically created by that user) (Logged in only)
• Create an Event (Logged in only)

Components
• Comment List
• Private Route

Server side ----
Models:

User model -
{
email: {
type: String,
required: [true, "Email is required."],
unique: true,
lowercase: true,
trim: true,
},
password: {
type: String,
required: [true, "Password is required."],
},
},

Event model -
{
title: {
type: String,
required: true,
},

date: {
type: String,
required: true,
default: "20/05/2023",
},

location: {
type: String,
required: true,
},

genre: {
type: String,
required: false,
default: "Soul",
},

details: {
type: String,
required: false,
default: "Super cool show",
},

createdBy: {
type: Schema.Types.ObjectId,
ref: "User",
},
},

Comment model -
{
comment: {
type: String,
trim: true,
required: true,
},

createdBy: {
type: Schema.Types.ObjectId,
ref: "User",
},
eventAbout: {
type: Schema.Types.ObjectId,
ref: "Event",
},
},

API Endpoints/Backend Routes

• POST - /auth/signup - Success Status: 200 - Error status: 400
• POST - /auth/login - Success Status: 200 - Error status: 400
• GET - /auth/verify - To verify the user and provide a JWT Token.
• GET - /event/all-events - Success Status: 200 - Error status: 400
• GET - /event/all-events/my-events - Success Status: 200 - Error status: 400
• GET - /event/:eventId - Success Status: 200 - Error status: 400
• POST - /event/create - Success Status: 201 - Error status: 400
• PUT - /event/:eventId - Success Status: 200 - Error status: 400
• DELETE - /event/:eventId Success Status: 200 - Error status: 400
• GET - /comment//all-comments/:eventId - Success Status: 200 - Error status: 400
• POST - /comment/new-comment - Success Status: 201 - Error status: 400
• DELETE - /comment/:commentId Success Status: 200 - Error status: 400

Links
Trello: https://trello.com/b/trvjte3w/eventhorizon

GitHub -
Frontend: https://github.com/Francieli-S/project-3-frontend
Backend: https://github.com/Francieli-S/project-3-backend

Deployments -
Frontend: https://main--aesthetic-empanada-da92c6.netlify.app/
Backend: https://eventhorizon.adaptable.app

Slides: https://slides.com/willhutchinson5150/eventhorizon
