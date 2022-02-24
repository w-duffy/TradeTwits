# TradeTwits
[TradeTwits](http://tradetwits.herokuapp.com/), a full-stack application is an online platform for users to discuss stocks and see real time stock data.

Visit our [wiki](https://github.com/w-duffy/TradeTwits/wiki) for more information.

## Live Link
[TradeTwits](http://tradetwits.herokuapp.com/)


**Get Started**

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/w-duffy/TradeTwits
   ```

2. Install Backend dependencies inside the python-project-starter directory

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt     
      ```
3. Install Frontend dependencies inside the react-app directory

    * ```npm install```


4. Create a .env file base on the .env.example given in the root directory BEWARE the API keys needed are from Finnhub-python and Rapid-API

5. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

6. Migrate and Seed models into the DB

     ```pipenv run flask db upgrade```
     ```pipenv run flask seed all```

7. You can start the front end from the react-app directory by:

    * ```npm start```

8. You can start the backend from the python-project-starter by:

    * ```pipenv run flask run```



