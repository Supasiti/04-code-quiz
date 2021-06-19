# 04-code-quiz

## Task

In this project, I was tasked to code quiz challenge that have the following mechanics:
- It will be multiple choice;
- Upon answering a question, a user will be shown with the next question;
- There will be a countdown clock;
- If a user answers a question incorrectly, time will be substracted from the timer;
- the challenge stops when either a user answers all the questions within the time limit or they ran out of time;
- The score will be calculated by the time left on the clock. 
- User can then submit their score with their name to be stored locally.

### Preview

The end product should resemble the mock-up provided below:

![Code quiz demo](./assets/demo/screenshot.jpeg)

> **Note:** This layout will not look as good when the resolution drops below 300px.

## Installation
[(Back to top)](#task)

To use this project, first clone the repo on your device using the commands below:

    git init
    git clone https://github.com/Supasiti/04-code-quiz.git

## Usage
[(Back to top)](#task)

The final webpage can be accessed through the following [link](https://supasiti.github.io/04-code-quiz/).


## Design Consideration
[(Back to top)](#task)

To meet all the acceptance criteria above, the following design decisions were considered.

### Challenge mechanics
- There will be 5 questions in total.
- A time limit to answer all the questions is 75 seconds.
- A penalty for answering incorrectly is 15 seconds, so that if a user incorrectly guesses all 5 questions, they would get a score of 0.

### Visual elements
- A user will be notified whether or not they answer the last question correctly by the colour of background: green for an correct answer, and red for an incorrect one.

### Form
- A user must submit a non-empty name.
- A prompt will be displayed when an empty string is submitted.