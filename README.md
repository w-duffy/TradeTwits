# TradeTwits
[TradeTwits](http://tradetwits.herokuapp.com/) a full-stack application, is an online platform for users to discuss stocks and see real-time stock information.

<img src="https://i.ibb.co/JdFv8C1/Screenshot-2022-02-24-215015.png" />

Visit my [wiki](https://github.com/w-duffy/TradeTwits/wiki/TradeTwits) for more information.

## Get Started

1. Clone this repository 

   ```bash
   git clone https://github.com/w-duffy/TradeTwits
   ```

2. Install backend dependencies inside the python-project-starter directory

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt     
      ```
3. Install frontend dependencies inside the react-app directory

     ```bash
     npm install
     ```

4. Create a .env file base on the .env.example given in the root directory. The API keys needed are from [finnhub](https://finnhub.io/) and [Alpha Advantage](https://rapidapi.com/alphavantage/api/alpha-vantage/)

5. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

6. Migrate and seed the models into your database

     ```bash
     pipenv run flask db upgrade
     ```
     ```bash
     pipenv run flask seed all
     ```

7. Start the front end from the react-app directory

     ```bash
     npm start
     ```

8. Start the backend from the python-project-starter

     ```bash
     pipenv run flask run
     ```
     
## Features
### 1. Watchlist
* Logged in users can create a watchlist.
* Logged in users can view the stocks in their watchlist.
* Logged in users can delete stocks in their watchlist.

### 2. Comments
* Logged in users can post comments on a discussion page.
* Logged in users can edit their own comments.
* Logged in users can delete their own comments.


### 3. Replies
* Logged in users can reply to discussion comments.
* Logged in users can delete their replies.
* Logged in users can edit their replies.

### 4. Likes 
* Logged in users can like discussion comments and replies.
* Logged in users can remove previous likes.

### 5. Follow
* Logged in users can follow other users.
* Logged in users can unfollow a user they are following.

### 6. Search
* Logged in users can search for stocks to add to their watchlist.
* Logged in users can search for stocks to access the stock's discussion page.

## Technolgies and Frameworks Used
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=40/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/>
<img src="https://camo.githubusercontent.com/f7b8dd3ec5e0959272f5015575d66b6b6231329b1b597cca76d665453eb10f6b/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f73716c616c6368656d792f73716c616c6368656d792d6f726967696e616c2e737667" height=40/>
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"  height=40/>
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/>
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/>
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original-wordmark.svg" height=40/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" height=40/>
<img src="https://react-chartjs-2.js.org/img/favicon.ico" height=40/>

Javascript | Python | React | Redux | NodeJs | SQLAlchemy | PostgreSQL | CSS | HTML / JSX | Git | Flask | Docker | React-Chartjs-2
## Conclusion and Next Steps
While I am mostly happy with TradeTwit's functionality, there are a few additional features I would like to include in the future.  I would like to add the ability to reference users and discussions via a hashtagging system (i.e. @user or #ticker).  Additionally, I would like to expand the search and stock discussion features to include a broader range of stocks since I am currently limited to the S&P500.
## Contact
Email - w.duffy@outlook.com
