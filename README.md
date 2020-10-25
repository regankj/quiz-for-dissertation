# quiz-for-dissertation

This is the quiz I'm developing for my dissertation project, "who lives in the most realistic social media bubble?". 

Essentially, the users are asked to predict the responses of the general public to questions previously asked in British social attitudes surveys. We can then compare the users
answers to the actual ones, and determine how much of a bubble some users are in on certain topics. The user will also be able to compare their answers to the actual ones upon 
completing the quiz. 

The quiz will be published on Amazon Mechanical Turk, so that users will be paid to complete the quiz. Data collected from this will be used for my dissertation and also future
research.

## Node Modules to install:

* webpack
* webpack-cli
* webpack-dev-server
* @fortawesome/fontawesome-free
* fibers
* sass 
* sass-loader
* node-sass
* css-loader
* autoprefixer
* postcss-loader
* mini-css-extract-plugin
* bootstrap
* --save jquery popper.js
* firebase
* d3

## Instructions

Once the node modules have been installed, type "npm run start:dev" into the command line and press enter. This will start a local server at port 8080. In your web browser, go to the address localhost/8080 and you will be greeted by the first page which is the consent form. After this comes a page for the user to fill in some details, which is then followed by a brief political knowledge test. This has been included for research reasons. Upon completion, the user will arrive at the actual quiz. The quiz functions as follows:

* Firstly, select your own personal answer to the question using the radio buttons
* Use the up/down buttons to adjust the horizontal bars, which represent the percentage of what you think the public thought
* Click Confirm & Next to save your answer and move onto the next question (The next button in the bottom right has been included for development and testing purposes, 
  however it will be absent from the final quiz)
  

Once the quiz has been completed the user is presented with a page to offer any feedback. 
