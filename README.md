# TradeTwits
[TradeTwits](http://tradetwits.herokuapp.com/), a full-stack application is an online platform for users to discuss stocks and see real time stock data.

Visit our [wiki](https://github.com/w-duffy/TradeTwits/wiki) for more information.

#Get Started

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/w-duffy/TradeTwits
   ```

2. Install Backend dependencies inside the python-project-starter directory

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt     
      ```
3. Install Frontend dependencies inside the react-app directory

     ```npm install```


4. Create a .env file base on the .env.example given in the root directory BEWARE the API keys needed are from Finnhub-python and Rapid-API

5. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

6. Migrate and Seed models into the DB

     ```pipenv run flask db upgrade```
     ```pipenv run flask seed all```

7. You can start the front end from the react-app directory by:

     ```npm start```

8. You can start the backend from the python-project-starter by:

     ```pipenv run flask run```
     
## Features
### 1. Portfolio
* Logged in users can create portfolios.
* Logged in users can view the stocks in their portfolio.
* Users can edit their portfolio names, and stocks in the portfolio.
* Users can delete their portfolios.

### 2. Stock Discussion/Comments
* Logged in users can post comments on a discussion page.
* Logged in users can edit their own comments.
* Logged in users can delete their own comments.
* All users can read comments.

## 3. Replies
* Logged in users can reply to discussion comments.
* Logged in users can delete their replies.
* Logged in users can edit their replies.
* All users can read replies.

## 4. Likes 
* Logged in users can like discussion comments and replies.
* Logged in users can remove previous likes.
* All users can see the number of likes on a comment and reply.

## 5. Follow
* Logged in users can follow other users.
* Logged in users can unfollow a user they are following.
* All users can see who is following a user, and who a user follows.

## 6. Search
* Logged in users can search for stocks to add to their portfolio.
* Logged in users can search for stocks to access the stock's discussion page.
