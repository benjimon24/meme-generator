# Meme Generator

A full-stack application created using Java Spring Boot back-end and React front-end. The back-end API is built using the microservices design pattern, following TDD principles.

---

## Proposal

Frequent internet users may find it necessary but difficult to create their own memes. This application allows users to find the most popular templates, add custom text, track, and share the memes that they have created.

---

## Problems

Would have liked to have spent some time learning semantic-ui-react but spent too much time on the core functionality. I ran into a couple of React gotcha's along the way.

* The first was dealing with CORS - I had to install a chrome extension to avoid it.
* Another problem was trying to pass in data to the third-party API correctly. It would only accept form-data and I had to write a work-around.
* I encountered an issue where state wasn't updating in my individual components even though the parent component was replacing them. I realized I had to set unique keys for each child component.

---

## Upcoming Features

* Style the app with semantic-ui
* Allow user to click on his own memes and use it as a template for a new meme
* User authentication
* Live preview of the meme before you submit

---

## Configuration

* Tests are not configured with gradle - but they can be manually run from within IntelliJ. There are no feature tests or repository tests.
* The back-end api can be run using 'docker-compose up' from the wrapper api
* The front-end app has to be run seperately with 'yarn start' in the meme-generator directory within the wrapper

---

## Developer Notes

* The back end supports create, read, and delete, but does not have a route for updating - considering the back-end memes-api only stores one piece of data at the moment (the url), I thought it was unnecessary

---

## Technologies Used

* React
* Java Springboot
* [Imgflip API](https://api.imgflip.com/)
