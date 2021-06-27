import datetime
from re import VERBOSE
import tweepy
from tweepy import AppAuthHandler
import pandas as pd
consumer_key = 'dE7uzTgM9d2cp3f3PiI2E0Tai'
consumer_secret = 'kTu8Hzu6pttwcJvLNTsU8ZZLh5zvycQm2anuM86zVIq5snZyaG'

auth = AppAuthHandler(consumer_key, consumer_secret)
api = tweepy.API(auth)

#IMPORTANT: 'tweet' attributes(Obtained via ``print(dir(tweet)`` inside the for loop)):
            # 'author', 'contributors', 'coordinates', 'created_at', 'destroy', 'entities', 'favorite', 'favorite_count', 'favorited', 'geo', 'id', 'id_str', 'in_reply_to_screen_name', 'in_reply_to_status_id', 'in_reply_to_status_id_str', 'in_reply_to_user_id', 'in_reply_to_user_id_str', 'is_quote_status', 'lang', 'metadata', 'parse', 'parse_list', 'place', 'retweet', 'retweet_count', 'retweeted', 'retweets', 'source', 'source_url', 'text', 'truncated', 'user' 

def extract(keyword = 'OnePlus', from_days = 0, fraction = 5, verbose = False):
# keyword: Keyword for scraping tweets (Compulsory).
# from_days: Scrape tweets from several days ago.
# fractions: Number of tweets per day.
# Verbose: To log the fetched tweets on terminal.

    assert keyword is not None,"Empty Keyword Supplied"
    assert from_days <= 7,"Tweepy constraint: can't allow more than 7 days!"
    print(keyword)
    tweets = []                 #[created_at, tweet]
    while from_days >= 0:
        #Example: 
        #   until = 2021-06-16 -> tweets fetched of date = 2021-06-15        
        
        until = (datetime.datetime.today() - datetime.timedelta(days = from_days)).strftime('%Y-%m-%d')
        print('Fetching tweets of:', (datetime.datetime.today() - datetime.timedelta(days = from_days + 1)).strftime('%Y-%m-%d'))
        for tweet in tweepy.Cursor(api.search, q=keyword, lang='en', until=until).items(fraction):    
            if verbose:
                print(tweet.created_at.strftime('%Y-%m-%d'), tweet.text)
            tweets.append([tweet.created_at.strftime('%Y-%m-%d'), tweet.text])
        from_days -= 1
    df = pd.DataFrame(tweets, columns = ['Date', 'Tweets'])
    
    return df