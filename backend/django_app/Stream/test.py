import twint
import nest_asyncio
import datetime


eliminate_count = 0
#NOTE: Try using the previous extracted tweets count to eliminate the old tweets using slicing
def extract_tweets(keyword = '#CocaCola', return_mode = 'pure', since = str(datetime.date.today()), until = None, country = 'India'):
    global eliminate_count

    nest_asyncio.apply()
    c = twint.Config()
    c.Search = keyword
    c.Show_hashtags = True
    c.Lang = 'en'
    c.Limit = 400
#    c.Custom = ['id', 'date', 'time', 'tweet', 'place', 'likes', 'geo', 'hashtags']
    c.Store_object = True
    if until is not None:
        c.Since = since
        c.Until = until
    
#    c.Location = True           # Not working Right now!, location can be extracted using tweet_obj.geo
    
#    c.Near = country            # Setting country/city.
    twint.run.Search(c)
    tweets_obj = twint.output.tweets_list
    
    if len(tweets_obj)>500:
        tweets_obj = tweets_obj[:500]
    
      
    uniq_tweets = {}
    for i in range(0, len(tweets_obj) -1):
        if i >= len(tweets_obj) - 1:
            break
        if tweets_obj[i].tweet not in uniq_tweets:
            uniq_tweets[tweets_obj[i].tweet] = 1
        else:
            del tweets_obj[i]
            i-= 1

    if return_mode == 'pure':
        # Scraping only TWEETS from tweets object
        tweets = [x for x,_ in uniq_tweets.items()]
        tweets = tweets[eliminate_count:]
        eliminate_count = len(tweets)
        return tweets

    elif return_mode == 'object':
        tweets = tweets_obj
        tweets = tweets[eliminate_count:]
        eliminate_count = len(tweets)
        return tweets_obj

def get_pure_tweets(tweets_obj):
    
    try:
        assert(tweets_obj is not None),"Empty Twint tweets object passed"
    except AssertionError as msg:
        print(msg)
    
    tweets = [x.tweet for x in tweets_obj]
    return tweets

def get_top_hashtags(tweets_obj):

    try:
        assert(tweets_obj is not None),"Empty Twint tweets object passed"
    except AssertionError as msg:
        print(msg)

    map = {}
    for tweet in tweets_obj:
        for hashtag in tweet.hashtags:
            if hashtag not in map:
                map[hashtag] = 1
            else:
                map[hashtag]+= 1

    hashtags_list = []
    for hashtag, cnt in map.items():
        hashtags_list.append([hashtag, cnt])

    hashtags_list.sort(key= lambda x: x[1], reverse = True)

    return hashtags_list

