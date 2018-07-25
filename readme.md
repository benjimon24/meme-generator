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

* Allow user to click on his own memes and use it as a template for a new meme
* Update the text on an existing meme that you created
* User authentication
* Live preview of the meme before you submit
* Changing font and positioning of meme text

---

## Configuration

* Tests are not configured with gradle - but they can be manually run from within IntelliJ. There are no feature tests or repository tests.
* The back-end api can be run using 'docker-compose up' from the wrapper API
* The front-end app has to be run seperately with 'yarn start' in the meme-generator directory within the wrapper

---

## Developer Notes

* The back end supports full CRUD but the front-end doesn't support updating. At the moment it doesn't really make sense to considering the back-end just stores the URL and changing the URL would no longer give you the image. If I were to expand this project I would probably want to make the back-end store the template ID as well as the top and bottom texts, so if you wanted to update the meme you can post to the third party API and get a new URL.

---

## Technologies Used

* React
* Java Springboot
* [Imgflip API](https://api.imgflip.com/)
