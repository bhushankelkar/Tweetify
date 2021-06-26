import twint
import nest_asyncio

def extract_tweets(keyword):
    # nest_asyncio.apply()
    c = twint.Config()

    c.Search = keyword
    c.Show_hashtags = True
    c.Lang = 'en'
    c.Limit = 400
    c.Store_object = True
    # c.Geo="20.593684, 78.96288,3214km"
    c.Hide_output = True
    twint.output.tweets_list=[]
    twint.run.Search(c)
    tweets = [obj.tweet for obj in twint.output.tweets_list]
    if len(tweets)>500:
        tweets = tweets[:500]
        
    uniq_tweets = {}
    for x in tweets:
        if x not in uniq_tweets:
            uniq_tweets[x] = 1
        else:
            uniq_tweets[x]+= 1
            
    tweets = [x for x,_ in uniq_tweets.items()]
    
    # print("HEEEEEEEEEEEEEEEEEEERRRRREE\n",tweets[0])
    return tweets

# extract_tweets('modi')