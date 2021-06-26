from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http.response import JsonResponse
from rest_framework.views import APIView
from prediction.apps import PredictionConfig
# from . models import Tweets
# from . serializers import TweetSerializer,Test
from prediction.admin import PredictionConfig
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
from .pre_product import preprocess,extract_hashtag
from Stream.extract_tweets import extract_tweets
from collections import Counter as Counter
import re
from nltk.corpus import stopwords
import pandas as pd

import re
from nltk.corpus import stopwords
import pandas as pd

# Create your views here.
# Class based view to predict based on IRIS model
class Tweet_Label(APIView):
    def get(self, request, format=None):
        print("Requested data",request.GET['text'])
        message = request.GET['text']
        messages =[message,]
        message=preprocess(messages)
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
        counts={
            'label':a[0]
        }
        return Response(counts, status=status.HTTP_201_CREATED)