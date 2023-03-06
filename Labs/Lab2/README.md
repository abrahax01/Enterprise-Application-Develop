# Enterprise Application Develop Lab 2
### Abraham Izarra / C19340801 

## Instructions to execute

### Start Server
1. Open a terminal tab and cd into lab2/server:
2. npm i 
3. npm run start -- starts server 

npm run dev -- starts server (development mode using nodemon)

### Start Client
1. Open a second terminal tab and cd into lab2/client:
2. npm i 
3. npm run start -- starts client and opens localhost:3000 automatically

## What to expect

### Home 
- Once the server and client have been started you will be directed to localhost:3000

- In this page you will see a brief explanation of the technologies I used (React, Axios, Jquery)

- A text placeholder asking user to click the button to load the table, once the button is clicked it will change to 'The folder (country data) has been read' and when the table is hidden it will change to 'All files have been read!'

- Here is a button that fetches the country data using Axios, once clicked it will create the table for setting the data and add 8 new buttons with different Jquery functionalities 

- Another text placeholder letting user know how long it took to create the table

- Selection of cells inside the table is possible using Jquery

#### buttons
1. Show Countries Names: will show a list with all the countries names.

2. Show All: Once clicked it will show all the countries in the table (instead of the initial 20) but it will removed the other buttons as the Jquery functions take too long to complete.

3. Fade tableContent: Animates table visibility

4. Highlight rows: Changes background colour for even rows 

5. Change text colour: Changes text colour inside the table to red

6. Increase font size

7. Decrease font size 

8. Animate text: changes opacity and text spacing of the content inside the table

