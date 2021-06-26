from prediction.admin import PredictionConfig
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
from .pre_product import preprocess,extract_hashtag
from Stream.extract_tweets import extract_tweets
from collections import Counter as Counter
import re
from nltk.corpus import stopwords
import pandas as pd
def pred(keyword):
    
    raw_message=extract_tweets(keyword)
    message=preprocess(raw_message)
    # seq=[one_hot(words,voc_size)for words in new_complaint] 
    # print(message)
    seq = PredictionConfig.tokenizer.texts_to_sequences(message)
    padded = pad_sequences(seq, maxlen=150)
    preds = PredictionConfig.loaded_model.predict(padded)
    # print(preds)
    labels = [0,1,-1]
    a=[]
    for i in preds:
        a.append(labels[np.argmax(i)])
    return a,raw_message

def get_frequent_hashtags(tweet,label):
    import operator
    # Creating an empty dictionary
    myDict = {}
    
    lst = extract_hashtag(tweet)
    # Adding list as value


    # creating a list
    # lst = [['Happy', 'For', 'Geeks'],[],['Happy'],['Sad','Cute'],[],['Happy','For']]
    print(lst)
    for i in range(len(lst)):
        for j in range(len(lst[i])):
            key = lst[i][j]
            if key not in myDict.keys():
                myDict[key] = [0,0,0]

            if label[i]==0:
                    myDict[key][0]+=1
            elif label[i]==1:
                    myDict[key][1]+=1
            else:
                    myDict[key][2]+=1
                    
    pos_dict = dict(sorted(myDict.items(),key=lambda x: x[1][1],reverse=True)[:5])
    neg_dict = dict(sorted(myDict.items(),key=lambda x: x[1][0],reverse=True)[:5])
    neu_dict = dict(sorted(myDict.items(),key=lambda x: x[1][2],reverse=True)[:5])
    merged = {**pos_dict,**neg_dict,**neu_dict}
    # print(myDict)
    # print(pos_dict)
    # print(neg_dict)
    # print(neu_dict)
    # print("merged dictionary",merged)
    return merged
    

    

def count(label):
    pos=0
    neg=0
    neu=0
    for i in label:
        if i==1:
            pos=pos+1
        elif i==0:
            neu=neu+1
        else:
            neg=neg+1
    return pos,neg,neu

def frequent(data_set):
    data_set="".join(data_set)
    data_set=re.sub('[^a-zA-Z]', ' ', data_set)
    data_set = re.sub(r'https?://(www\.)?',' ',data_set)
    data_set = re.sub(r'https',' ',data_set)
    split_it = data_set.split()
    C = Counter(split_it)
    most_occur = C.most_common(500)
    freq=convert(most_occur)
    return freq


def convert(tup):
    
    arr=[]
   
    for i in tup:
        if i[0] in stopwords.words('english'):
            continue
        arr.append({"text":i[0],"value":i[1]})
    # print(arr)
    return arr

def get_sentiment_from_keyword():
    pass

def get_line_chart_daily():
    import pandas as pd
    import dateutil
    df=pd.read_csv('C:\\Users\\Bhushan\\OneDrive\\Documents\\Tweetify-1-master\\backend\\django_app\\prediction\\demo1.csv')
    print(df.head())
    
    new_df= (pd.get_dummies(df,columns=["label"]))

    new_df= new_df.groupby(['date'],as_index=False).sum()
    new_df['date']=new_df['date'].astype(str)
    line_daily= (new_df.set_index('date').T.to_dict('list'))
    return line_daily
    # print(new_df)
    # myvenv\Scripts\activate
    # cd backend/django_app/prediction
    #python line.py

def get_gauge_chart():
    keywords = ['battery','charge','memory','space','screen','price','cost']
    df=pd.read_csv('C:\\Users\\Bhushan\\OneDrive\\Documents\\Tweetify-1-master\\backend\\django_app\\prediction\\demo.csv')
    print(df.head())
    df['tweet']=preprocess(df['tweet'])
    print(df['tweet'])
    keywords_stem = preprocess(keywords)
    print(keywords)
    myDict = {}
    for i in range(len(df)):
        for keyword in keywords_stem:
            if keyword in df.loc[i,"tweet"]:
                if keyword not in myDict.keys():
                    myDict[keyword]=[0,0,0]
                if df.loc[i,"label"]==0:
                    myDict[keyword][0]+=1
                elif df.loc[i,"label"]==1:
                    myDict[keyword][1]+=1
                else:
                    myDict[keyword][2]+=1
    return myDict


def get_company1_sentiment():
    df=pd.read_csv('C:\\Users\\Bhushan\\OneDrive\\Documents\\Tweetify-1-master\\backend\\django_app\\prediction\\company1.csv')
    print(df.head())
    pos,neg,neu= count(df['label'])
    myDict = {}
    myDict['sentiment'] = [pos,neg,neu]
    return myDict

    
def get_company2_sentiment():
    df=pd.read_csv('C:\\Users\\Bhushan\\OneDrive\\Documents\\Tweetify-1-master\\backend\\django_app\\prediction\\company2.csv')
    print(df.head())
    pos,neg,neu=count(df['label'])
    myDict = {}
    myDict['sentiment'] = [pos,neg,neu]
    return myDict

def get_company1_line_chart():
    df=pd.read_csv('C:\\Users\\Bhushan\\OneDrive\\Documents\\Tweetify-1-master\\backend\\django_app\\prediction\\company1.csv')
    print(df.head())
    new_df= (pd.get_dummies(df,columns=["label"]))

    new_df= new_df.groupby(['date'],as_index=False).sum()
    new_df['date']=new_df['date'].astype(str)
    line_c1= (new_df.set_index('date').T.to_dict('list'))
    return line_c1

def get_company2_line_chart():
    df=pd.read_csv('C:\\Users\\Bhushan\\OneDrive\\Documents\\Tweetify-1-master\\backend\\django_app\\prediction\\company2.csv')
    print(df.head())
    new_df= (pd.get_dummies(df,columns=["label"]))
    new_df= new_df.groupby(['date'],as_index=False).sum()
    new_df['date']=new_df['date'].astype(str)
    line_c2= (new_df.set_index('date').T.to_dict('list'))
    return line_c2

def get_company1_keyword():
    keywords = ['battery','charge','memory']
    df=pd.read_csv('C:\\Users\\Bhushan\\OneDrive\\Documents\\Tweetify-1-master\\backend\\django_app\\prediction\\company1.csv')
    print(df.head())
    df['tweet']=preprocess(df['tweet'])
    print(df['tweet'])
    keywords_stem = preprocess(keywords)
    print(keywords)
    myDict = {}
    for i in range(len(df)):
        for keyword in keywords_stem:
            if keyword in df.loc[i,"tweet"]:
                if keyword not in myDict.keys():
                    myDict[keyword]=[0,0,0]
                if df.loc[i,"label"]==0:
                    myDict[keyword][0]+=1
                elif df.loc[i,"label"]==1:
                    myDict[keyword][1]+=1
                else:
                    myDict[keyword][2]+=1
    return myDict

def get_company2_keyword():
    keywords = ['battery','charge','memory']
    df=pd.read_csv('C:\\Users\\Bhushan\\OneDrive\\Documents\\Tweetify-1-master\\backend\\django_app\\prediction\\company2.csv')
    print(df.head())
    df['tweet']=preprocess(df['tweet'])
    print(df['tweet'])
    keywords_stem = preprocess(keywords)
    print(keywords)
    myDict = {}
    for i in range(len(df)):
        for keyword in keywords_stem:
            if keyword in df.loc[i,"tweet"]:
                if keyword not in myDict.keys():
                    myDict[keyword]=[0,0,0]
                if df.loc[i,"label"]==0:
                    myDict[keyword][0]+=1
                elif df.loc[i,"label"]==1:
                    myDict[keyword][1]+=1
                else:
                    myDict[keyword][2]+=1
    return myDict
    


    







