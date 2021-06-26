from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http.response import JsonResponse
from rest_framework.views import APIView
from prediction.apps import PredictionConfig
from . models import Tweets
# from . serializers import TweetSerializer,Test
from . ML_product import pred as pred
from . ML_product import count as count
from . ML_product import frequent as frequent
from .ML_product import get_frequent_hashtags as hashtag
from .ML_product import get_line_chart_daily
# Create your views here.
# Class based view to predict based on IRIS model
class Tweet_List(APIView):
    def get(self, request, format=None):
        print("Requested data",request.GET['text'])
        label,tweet_array=pred(request.GET['text'])
        merged=hashtag(tweet_array,label)
        tweet_array=tweet_array[0:10]
        freq_array=frequent(tweet_array[0:100])
        pos,neg,neu=count(label)
        print(get_line_chart_daily())
        # print("fuuuulllllllllllllllllllllllllllllo")
        
        counts={'positive':pos,'negative':neg,'neutral':neu,'tweets':tweet_array,'freq_array':freq_array,'hashtag':merged}
        # serializer =TweetSerializer(data=request.data)
        # print(counts)
        # if serializer.is_valid():
            # serializer.save()
        return Response(counts, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def get(self,request,format=None):
    #     tweet = Tweets.objects.all()
    #     tweet = TweetSerializer(tweet,many=True) 
    #     return JsonResponse(tweet.data,safe=False) 



