from prediction.admin import PredictionConfig
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
from .pre_product import preprocess,extract_hashtag
from Stream.extract_tweets import extract_tweets
from Stream.extractontimeline import extract
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
    #print(lst)
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



def get_line_chart_daily(pro_name):
    import pandas as pd
    import dateutil
    df = extract(pro_name,7,5,False)
    
    df['Tweets']=preprocess(df['Tweets'])
    seq = PredictionConfig.tokenizer.texts_to_sequences(df['Tweets'])
    padded = pad_sequences(seq, maxlen=150)
    preds = PredictionConfig.loaded_model.predict(padded)
    labels = [0,1,-1]
    a=[]
    for i in preds:
        a.append(labels[np.argmax(i)])
    df['labels'] = a
    #print("After labels",df)
    
    df=df.sort_values(by=['Date'],ascending=True)
    

    df= (pd.get_dummies(df,columns=["labels"]))
    df= df.groupby(['Date'],as_index=False).sum()
    df['Date']=df['Date'].astype(str)
    df=checkPresence(df)
    line_daily= (df.set_index('Date').T.to_dict('list'))
    
    print("Line daily",line_daily)
    
    return line_daily

def get_keyword_chart(search,keywords):
    label,tweet_array=pred(search)
    dict = {'tweet': tweet_array, 'label': label} 
    df = pd.DataFrame(dict)
    df['tweet']=preprocess(df['tweet'])
    keywords_stem = preprocess(keywords)
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


def get_company_sentiment(pro1,pro2,keywords):
    
    label1,tweet_array1=pred(pro1)
    label2,tweet_array2=pred(pro2)
    pos1,neg1,neu1=count(label1)
    pos2,neg2,neu2=count(label2)
    
    myDict1 = {}
    myDict1['sentiment'] = [pos1,neg1,neu1]
    
    myDict2 = {}
    myDict2['sentiment'] = [pos2,neg2,neu2]
    return myDict1,myDict2

    
# def get_company2_sentiment():
#     df=pd.read_csv('C:\\Users\\Bhushan\\OneDrive\\Documents\\Tweetify-1-master\\backend\\django_app\\prediction\\company2.csv')
#     print(df.head())
#     pos,neg,neu=count(df['label'])
#     myDict = {}
#     myDict['sentiment'] = [pos,neg,neu]
#     return myDict

def checkPresence(df):
    if 'labels_0' not in df.columns:
        df['labels_0']=0
    if 'labels_1' not in df.columns: 
        df['labels_1']=0
    if 'labels_-1' not in df.columns: 
        df['labels_-1']=0
    return df

def get_company_line_chart(days,pro1,pro2):
    # df=pd.read_csv('C:\\Users\\Bhushan\\OneDrive\\Documents\\Tweetify-1-master\\backend\\django_app\\prediction\\company1.csv')
    # print(df.head())
    # new_df= (pd.get_dummies(df,columns=["label"]))

    # new_df= new_df.groupby(['date'],as_index=False).sum()
    # new_df['date']=new_df['date'].astype(str)
    # line_c1= (new_df.set_index('date').T.to_dict('list'))
    # return line_c1
    import pandas as pd
    import dateutil

    if days<1:  #handling if choose date not selected
        days=7
    df1 = extract(pro1,days-1,5,False)
    
    df1['Tweets']=preprocess(df1['Tweets'])
    seq = PredictionConfig.tokenizer.texts_to_sequences(df1['Tweets'])
    padded = pad_sequences(seq, maxlen=150)
    preds = PredictionConfig.loaded_model.predict(padded)
    labels = [0,1,-1]
    a=[]
    for i in preds:
        a.append(labels[np.argmax(i)])
    df1['labels'] = a
     
    df1=df1.sort_values(by=['Date'],ascending=True)
    
   
    df1= (pd.get_dummies(df1,columns=["labels"]))
    df1= df1.groupby(['Date'],as_index=False).sum()
    df1['Date']=df1['Date'].astype(str)
    df1=checkPresence(df1)
    line_daily1= (df1.set_index('Date').T.to_dict('list'))
    
    print("Line daily 1",line_daily1)
   
    df2 = extract(pro2,days-1,5,False)
    
    df2['Tweets']=preprocess(df2['Tweets'])
    seq1 = PredictionConfig.tokenizer.texts_to_sequences(df2['Tweets'])
    padded1 = pad_sequences(seq1, maxlen=150)
    preds1 = PredictionConfig.loaded_model.predict(padded1)
    labels1 = [0,1,-1]
    a1=[]
    for i in preds1:
        a1.append(labels1[np.argmax(i)])
    df2['labels'] = a1
   
    
    df2=df2.sort_values(by=['Date'],ascending=True)
    

    df2= (pd.get_dummies(df2,columns=["labels"]))
    df2= df2.groupby(['Date'],as_index=False).sum()
    df2['Date']=df2['Date'].astype(str)
    df2=checkPresence(df2)
    line_daily2= (df2.set_index('Date').T.to_dict('list'))
    print("Line daily 2",line_daily2)
    #print("Line daily",line_daily2)
    return line_daily1,line_daily2



def get_company_keyword(search,keywords):
    return get_keyword_chart(search,keywords)
    



    







