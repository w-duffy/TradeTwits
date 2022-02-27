from flask import Blueprint, request
# import requests
# import os
from app.models import db, StockDiscussion, Comment, Like, Reply, Portfolio
from datetime import datetime
import requests
import os
import pandas as pd

stock_discussion_routes = Blueprint("discussion", __name__)

@stock_discussion_routes.route("/<string:ticker>")
def get_portfolio_stats(ticker):
    discussion = StockDiscussion.query.filter(StockDiscussion.ticker == ticker).all()
    return(discussion[0].to_dict())

    # return(info)
@stock_discussion_routes.route("/graph/<string:ticker>")
def get_discussion_graph(ticker):
    all_details = []
    portfolio_detail = {}
    try:
        url = "https://alpha-vantage.p.rapidapi.com/query"

        querystring = {"function":"TIME_SERIES_DAILY","symbol": ticker.upper(),"outputsize":"compact",  "datatype":"json"}
        headers = {
        'x-rapidapi-host': "alpha-vantage.p.rapidapi.com",
        'x-rapidapi-key': os.environ.get("RAPID_API_KEY")
        }
        response = requests.request("GET", url, headers=headers, params=querystring)
        object = response.json()

        values_to_destructure = object["Time Series (Daily)"]
    #dummy data if APi doesn't work
    except:
        values_to_destructure = {'2022-02-18': {'1. open': '209.3900', '2. high': '210.7500', '3. low': '205.1800', '4. close': '206.1600', '5. volume': '37128438'}, '2022-02-17': {'1. open': '214.0200', '2. high': '217.5000', '3. low': '207.1601', '4. close': '207.7100', '5. volume': '38747533'}, '2022-02-16': {'1. open': '212.4100', '2. high': '217.4600', '3. low': '212.3600', '4. close': '216.5400', '5. volume': '45817457'}, '2022-02-15': {'1. open': '220.4700', '2. high': '221.1500', '3. low': '215.0600', '4. close': '221.0000', '5. volume': '42685473'}, '2022-02-14': {'1. open': '219.3100', '2. high': '221.0000', '3. low': '214.7800', '4. close': '217.7000', '5. volume': '38184035'}, '2022-02-11': {'1. open': '228.4600', '2. high': '230.4200', '3. low': '218.7701', '4. close': '219.5500', '5. volume': '46156943'}, '2022-02-10': {'1. open': '228.2700', '2. high': '235.0000', '3. low': '226.7000', '4. close': '228.0700', '5. volume': '49310356'}, '2022-02-09': {'1. open': '224.2000', '2. high': '233.3700', '3. low': '222.2100', '4. close': '232.0000', '5. volume': '86563275'}, '2022-02-08': {'1. open': '220.8500', '2. high': '225.7700', '3. low': '216.1500', '4. close': '220.1800', '5. volume': '94729672'}, '2022-02-07': {'1. open': '237.7000', '2. high': '238.3000', '3. low': '224.0100', '4. close': '224.9100', '5. volume': '88613826'}, '2022-02-04': {'1. open': '234.9700', '2. high': '242.6099', '3. low': '230.1100', '4. close': '237.0900', '5. volume': '89342247'}, '2022-02-03': {'1. open': '244.6450', '2. high': '248.0000', '3. low': '235.7450', '4. close': '237.7600', '5. volume': '188119925'}, '2022-02-02': {'1. open': '327.8200', '2. high': '328.0000', '3. low': '316.8747', '4. close': '323.0000', '5. volume': '58458280'}, '2022-02-01': {'1. open': '314.5550', '2. high': '319.6598', '3. low': '312.1200', '4. close': '319.0000', '5. volume': '18023796'}, '2022-01-31': {'1. open': '300.6800', '2. high': '313.7900', '3. low': '299.3200', '4. close': '313.2600', '5. volume': '21579474'}, '2022-01-28': {'1. open': '295.6204', '2. high': '301.9000', '3. low': '293.0333', '4. close': '301.7100', '5. volume': '21871620'}, '2022-01-27': {'1. open': '297.7520', '2. high': '301.7090', '3. low': '294.2600', '4. close': '294.6400', '5. volume': '21629922'}, '2022-01-26': {'1. open': '307.0100', '2. high': '307.5100', '3. low': '290.8500', '4. close': '294.6300', '5. volume': '28348801'}, '2022-01-25': {'1. open': '299.9500', '2. high': '306.2300', '3. low': '297.5800', '4. close': '300.1500', '5. volume': '25108454'}, '2022-01-24': {'1. open': '297.8400', '2. high': '309.5300', '3. low': '289.0100', '4. close': '308.7100', '5. volume': '38936901'}, '2022-01-21': {'1. open': '314.8100', '2. high': '318.3100', '3. low': '303.0400', '4. close': '303.1700', '5. volume': '28710717'}, '2022-01-20': {'1. open': '323.9000', '2. high': '327.8200', '3. low': '315.9800', '4. close': '316.5600', '5. volume': '16925030'}, '2022-01-19': {'1. open': '319.5822', '2. high': '327.1000', '3. low': '319.3300', '4. close': '319.5900', '5. volume': '20563976'}, '2022-01-18': {'1. open': '323.2900', '2. high': '324.2100', '3. low': '317.6400', '4. close': '318.1500', '5. volume': '22352652'}, '2022-01-14': {'1. open': '321.7900', '2. high': '332.7300', '3. low': '321.2100', '4. close': '331.9000', '5. volume': '16868497'}, '2022-01-13': {'1. open': '334.9800', '2. high': '335.6300', '3. low': '325.7600', '4. close': '326.4800', '5. volume': '14797109'}, '2022-01-12': {'1. open': '335.1800', '2. high': '336.3650', '3. low': '330.0300', '4. close': '333.2600', '5. volume': '14104858'}, '2022-01-11': {'1. open': '326.7800', '2. high': '334.6300', '3. low': '325.2800', '4. close': '334.3700', '5. volume': '16191633'}, '2022-01-10': {'1. open': '325.3100', '2. high': '328.3400', '3. low': '315.4300', '4. close': '328.0700', '5. volume': '24942383'}, '2022-01-07': {'1. open': '332.7400', '2. high': '337.0000', '3. low': '328.8801', '4. close': '331.7900', '5. volume': '14722020'}, '2022-01-06': {'1. open': '322.8200', '2. high': '339.1650', '3. low': '322.7200', '4. close': '332.4600', '5. volume': '27962809'}, '2022-01-05': {'1. open': '333.0200', '2. high': '335.7600', '3. low': '323.8400', '4. close': '324.1700', '5. volume': '20564521'}, '2022-01-04': {'1. open': '339.9500', '2. high': '343.0854', '3. low': '331.8711', '4. close': '336.5300', '5. volume': '15997974'}, '2022-01-03': {'1. open': '338.2950', '2. high': '341.0816', '3. low': '337.1900', '4. close': '338.5400', '5. volume': '14562849'}, '2021-12-31': {'1. open': '343.0150', '2. high': '343.4400', '3. low': '336.2700', '4. close': '336.3500', '5. volume': '12516527'}, '2021-12-30': {'1. open': '344.0000', '2. high': '347.2300', '3. low': '343.2200', '4. close': '344.3600', '5. volume': '10593347'}, '2021-12-29': {'1. open': '346.9100', '2. high': '349.6899', '3. low': '341.6401', '4. close': '342.9400', '5. volume': '10747009'}, '2021-12-28': {'1. open': '346.6300', '2. high': '352.7100', '3. low': '345.2000', '4. close': '346.2200', '5. volume': '16637608'}, '2021-12-27': {'1. open': '338.8450', '2. high': '347.8700', '3. low': '338.0100', '4. close': '346.1800', '5. volume': '17795026'}, '2021-12-23': {'1. open': '330.1000', '2. high': '336.6700', '3. low': '328.3600', '4. close': '335.2400', '5. volume': '13987698'}, '2021-12-22': {'1. open': '333.8003', '2. high': '334.5100', '3. low': '328.2600', '4. close': '330.4500', '5. volume': '16764566'}, '2021-12-21': {'1. open': '326.4100', '2. high': '336.0000', '3. low': '323.7500', '4. close': '334.2000', '5. volume': '16116784'}, '2021-12-20': {'1. open': '329.7750', '2. high': '329.9000', '3. low': '322.5300', '4. close': '325.4500', '5. volume': '17901783'}, '2021-12-17': {'1. open': '332.7950', '2. high': '337.1100', '3. low': '330.7500', '4. close': '333.7900', '5. volume': '40012637'}, '2021-12-16': {'1. open': '338.9800', '2. high': '344.4600', '3. low': '333.7400', '4. close': '334.9000', '5. volume': '22635025'}, '2021-12-15': {'1. open': '332.4935', '2. high': '342.1100', '3. low': '323.9800', '4. close': '341.6600', '5. volume': '24681326'}, '2021-12-14': {'1. open': '328.0500', '2. high': '335.7000', '3. low': '327.6500', '4. close': '333.7400', '5. volume': '20461024'}, '2021-12-13': {'1. open': '330.9500', '2. high': '341.0900', '3. low': '329.5900', '4. close': '334.4900', '5. volume': '22948655'}, '2021-12-10': {'1. open': '332.5550', '2. high': '335.0300', '3. low': '326.3700', '4. close': '329.7500', '5. volume': '14527969'}, '2021-12-09': {'1. open': '329.5400', '2. high': '336.1300', '3. low': '328.0000', '4. close': '329.8200', '5. volume': '16879168'}, '2021-12-08': {'1. open': '325.0000', '2. high': '332.7500', '3. low': '323.0700', '4. close': '330.5600', '5. volume': '19937722'}, '2021-12-07': {'1. open': '321.5700', '2. high': '326.5400', '3. low': '321.0000', '4. close': '322.8100', '5. volume': '18794047'}, '2021-12-06': {'1. open': '308.1300', '2. high': '320.1000', '3. low': '306.3400', '4. close': '317.8700', '5. volume': '21758340'}, '2021-12-03': {'1. open': '313.7300', '2. high': '313.7500', '3. low': '299.5000', '4. close': '306.8400', '5. volume': '27471010'}, '2021-12-02': {'1. open': '311.4000', '2. high': '314.6000', '3. low': '307.2000', '4. close': '310.3900', '5. volume': '24396169'}, '2021-12-01': {'1. open': '330.2900', '2. high': '330.5000', '3. low': '310.2900', '4. close': '310.6000', '5. volume': '30384083'}, '2021-11-30': {'1. open': '335.0000', '2. high': '335.8100', '3. low': '323.4300', '4. close': '324.4600', '5. volume': '25390008'}, '2021-11-29': {'1. open': '336.8900', '2. high': '340.6700', '3. low': '335.3050', '4. close': '338.0300', '5. volume': '16650949'}, '2021-11-26': {'1. open': '335.7950', '2. high': '337.7500', '3. low': '331.9020', '4. close': '333.1200', '5. volume': '14750737'}, '2021-11-24': {'1. open': '336.0000', '2. high': '341.7800', '3. low': '332.8100', '4. close': '341.0600', '5. volume': '13566181'}, '2021-11-23': {'1. open': '338.9300', '2. high': '341.3999', '3. low': '333.5000', '4. close': '337.2500', '5. volume': '17224986'}, '2021-11-22': {'1. open': '349.0500', '2. high': '353.8300', '3. low': '340.5100', '4. close': '341.0100', '5. volume': '27116811'}, '2021-11-19': {'1. open': '342.2000', '2. high': '352.1000', '3. low': '339.9000', '4. close': '345.3000', '5. volume': '26488541'}, '2021-11-18': {'1. open': '339.7200', '2. high': '342.4600', '3. low': '335.3000', '4. close': '338.6900', '5. volume': '17487235'}, '2021-11-17': {'1. open': '344.2400', '2. high': '347.3000', '3. low': '340.1000', '4. close': '340.7700', '5. volume': '13602812'}, '2021-11-16': {'1. open': '343.8300', '2. high': '346.6500', '3. low': '340.8700', '4. close': '342.9600', '5. volume': '18181106'}, '2021-11-15': {'1. open': '344.3400', '2. high': '353.6500', '3. low': '343.2000', '4. close': '347.5600', '5. volume': '25076603'}, '2021-11-12': {'1. open': '330.1800', '2. high': '341.8600', '3. low': '329.7800', '4. close': '340.8900', '5. volume': '25099642'}, '2021-11-11': {'1. open': '329.8200', '2. high': '332.4590', '3. low': '327.0000', '4. close': '327.7400', '5. volume': '12376563'}, '2021-11-10': {'1. open': '332.4900', '2. high': '333.1900', '3. low': '325.5100', '4. close': '327.6400', '5. volume': '21872605'}, '2021-11-09': {'1. open': '340.0000', '2. high': '341.3075', '3. low': '334.4700', '4. close': '335.3700', '5. volume': '17469000'}, '2021-11-08': {'1. open': '344.4200', '2. high': '344.7890', '3. low': '338.3400', '4. close': '338.6200', '5. volume': '18342458'}, '2021-11-05': {'1. open': '340.3100', '2. high': '346.7900', '3. low': '339.6400', '4. close': '341.1300', '5. volume': '26872817'}, '2021-11-04': {'1. open': '334.0065', '2. high': '337.2730', '3. low': '332.6500', '4. close': '335.8500', '5. volume': '22495281'}, '2021-11-03': {'1. open': '327.4900', '2. high': '332.1500', '3. low': '323.2000', '4. close': '331.6200', '5. volume': '20786502'}, '2021-11-02': {'1. open': '331.3800', '2. high': '334.7895', '3. low': '323.8000', '4. close': '328.0800', '5. volume': '28259036'}, '2021-11-01': {'1. open': '326.0400', '2. high': '333.4500', '3. low': '326.0000', '4. close': '329.9800', '5. volume': '31164440'}, '2021-10-29': {'1. open': '320.1900', '2. high': '325.9999', '3. low': '319.6000', '4. close': '323.5700', '5. volume': '37059384'}, '2021-10-28': {'1. open': '312.9900', '2. high': '325.5200', '3. low': '308.1100', '4. close': '316.9200', '5. volume': '50806840'}, '2021-10-27': {'1. open': '314.1900', '2. high': '319.2500', '3. low': '312.0600', '4. close': '312.2200', '5. volume': '29971761'}, '2021-10-26': {'1. open': '328.2600', '2. high': '330.2099', '3. low': '309.6000', '4. close': '315.8100', '5. volume': '65654043'}, '2021-10-25': {'1. open': '320.3000', '2. high': '329.5600', '3. low': '319.7200', '4. close': '328.6900', '5. volume': '38408957'}, '2021-10-22': {'1. open': '326.3450', '2. high': '329.6300', '3. low': '321.1100', '4. close': '324.6100', '5. volume': '35224543'}, '2021-10-21': {'1. open': '340.2750', '2. high': '342.3100', '3. low': '337.8000', '4. close': '341.8800', '5. volume': '16354423'}, '2021-10-20': {'1. open': '343.4450', '2. high': '343.9800', '3. low': '339.4531', '4. close': '340.7800', '5. volume': '13639465'}, '2021-10-19': {'1. open': '339.6450', '2. high': '342.4600', '3. low': '337.2800', '4. close': '339.9900', '5. volume': '18786316'}, '2021-10-18': {'1. open': '328.9500', '2. high': '335.8900', '3. low': '327.5000', '4. close': '335.3400', '5. volume': '21585018'}, '2021-10-15': {'1. open': '328.6800', '2. high': '329.0700', '3. low': '322.5100', '4. close': '324.7600', '5. volume': '21596370'}, '2021-10-14': {'1. open': '328.3550', '2. high': '330.5200', '3. low': '327.1000', '4. close': '328.5300', '5. volume': '14302154'}, '2021-10-13': {'1. open': '326.9700', '2. high': '327.0000', '3. low': '322.6600', '4. close': '324.5400', '5. volume': '14761470'}, '2021-10-12': {'1. open': '323.0300', '2. high': '324.3800', '3. low': '317.3700', '4. close': '323.7700', '5. volume': '31658684'}, '2021-10-11': {'1. open': '327.6250', '2. high': '330.4600', '3. low': '325.3100', '4. close': '325.4500', '5. volume': '14708224'}, '2021-10-08': {'1. open': '331.5100', '2. high': '333.4000', '3. low': '328.7100', '4. close': '330.0500', '5. volume': '15946110'}, '2021-10-07': {'1. open': '337.0000', '2. high': '338.8400', '3. low': '328.9800', '4. close': '329.2200', '5. volume': '28307456'}, '2021-10-06': {'1. open': '329.7400', '2. high': '334.3800', '3. low': '325.8000', '4. close': '333.6400', '5. volume': '26443010'}, '2021-10-05': {'1. open': '328.5800', '2. high': '335.1800', '3. low': '326.1638', '4. close': '332.9600', '5. volume': '35377947'}, '2021-10-04': {'1. open': '335.5300', '2. high': '335.9400', '3. low': '322.7000', '4. close': '326.2300', '5. volume': '42884975'}, '2021-10-01': {'1. open': '341.6100', '2. high': '345.0200', '3. low': '338.6400', '4. close': '343.0100', '5. volume': '14905311'}, '2021-09-30': {'1. open': '340.4450', '2. high': '342.8000', '3. low': '338.1500', '4. close': '339.3900', '5. volume': '16547094'}, '2021-09-29': {'1. open': '343.1500', '2. high': '345.2300', '3. low': '338.8800', '4. close': '339.6100', '5. volume': '14452241'}}
    #Creates an array of all the dates
    dates = []
    for key in values_to_destructure:
        dates.append(key)
    #creates an array of all the historical prices
    values = []
    panda_data = pd.DataFrame(values_to_destructure)
    panda_data_t = panda_data.T
    for index, row in panda_data_t.iterrows():
        values.append(row["4. close"])
    portfolio_detail['ticker'] = ticker
    portfolio_detail["dates"] = dates
    portfolio_detail["values"] = values
    all_details.append(portfolio_detail)

    info = {}
    info["info"] = all_details
    return(info)

@stock_discussion_routes.route('/new/comment', methods=['POST'])
# @login_required
def new_comment():
    object = request.json
    comment = object['comment']
    user_id = object['user_id']
    stock_discussion_id = object['stock_discussion_id']
    today = datetime.now()
    new_comment = Comment(user_id=user_id, comment=comment, stock_discussion_id=stock_discussion_id, time_created=today, time_updated=today)
    db.session.add(new_comment)
    db.session.commit()
    return new_comment.to_dict()

@stock_discussion_routes.route("/delete/<int:id>", methods=['DELETE'])
# @login_required
def deletePortfolioTicker(id):
    comment_to_delete = Comment.query.filter(Comment.id == id).all()
    likes_to_delete = Like.query.filter(Like.comment_id == id).all()
    replies_to_delete = Reply.query.filter(Reply.comment_id == id).all()
    for reply in replies_to_delete:
        reply_likes = Like.query.filter(Like.reply_id == reply.id).all()
        for l in reply_likes:
            db.session.delete(l)
        db.session.delete(reply)
    for like in likes_to_delete:
        db.session.delete(like)
    delete_object = comment_to_delete[0]

    db.session.delete(delete_object)
    db.session.commit()
    return delete_object.to_dict()

@stock_discussion_routes.route("/edit/<int:id>", methods=['PUT'])
# @login_required
def edit_discussion_comment(id):
    object = request.json
    new_comment = object['newComment']
    today = datetime.now()
    comment_to_edit = Comment.query.get(id)
    comment_to_edit.comment = new_comment
    comment_to_edit.time_updated = today
    db.session.add(comment_to_edit)
    db.session.commit()
    return comment_to_edit.to_dict()
