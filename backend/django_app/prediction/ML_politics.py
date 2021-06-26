from prediction.admin import PredictionConfig
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
from .pre_politics import extract_hashtag, preprocess
from Stream.extract_tweets import extract_tweets
from collections import Counter as Counter
import re
from nltk.corpus import stopwords
def pred(keyword):
    
    raw_message=extract_tweets(keyword)

    message=preprocess(raw_message)
    hashtags = extract_hashtag(raw_message)
    print(hashtags)
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
    # print("Frequent hashtagsssss",frequent(hashtags))
    return a,raw_message

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
    most_occur = C.most_common(50)
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



