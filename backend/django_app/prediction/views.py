from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http.response import JsonResponse
from rest_framework.views import APIView
from prediction.apps import PredictionConfig

from . models import User,Product
# from . serializers import TweetSerializer,Test
from . ML_product import pred as pred
from . ML_product import count as count
from . ML_product import frequent as frequent
from .ML_product import get_frequent_hashtags as hashtag
from .ML_product import get_line_chart_daily,get_gauge_chart,get_company1_sentiment,get_company2_sentiment,get_company1_line_chart,get_company2_line_chart,get_company1_keyword,get_company2_keyword
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
        line_daily = (get_line_chart_daily())
        keyword = get_gauge_chart()
        # print("hellllllllllllllllllllllllllllllllllllo")
        company1_sentiment = get_company1_sentiment()
        company2_sentiment = get_company2_sentiment()
        line1 = get_company1_line_chart()
        line2 = get_company2_line_chart()
        c1 = get_company1_keyword()
        c2 = get_company2_keyword()
        counts={
            'positive':pos,'negative':neg,'neutral':neu,'tweets':tweet_array,
            'freq_array':freq_array,'hashtag':merged,
            'line_daily':line_daily,'keyword':keyword,
            'company1_sentiment':company1_sentiment,
            'company2_sentiment':company2_sentiment,
            'company1_line':line1,
            'company2_line':line2,
            'company1_key':c1,
            'company2_key':c2,
            
            
            }
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

products=[]
class Login(APIView):
    
    def post(self, request, format=None):
        print("not")
        getemail=request.data['params']['email']
        getpassword=request.data['params']['password']
        verify = User.objects.filter(email=getemail)[0]
        print("verify",verify)
        if verify.password == getpassword:
            
            # print("here1 ",products)
            print("verified",verify.uid)
            product = Product.objects.filter(uid=verify.uid)
            products=[]
            for i in product:
                products.append(i.name)
            
        
            





    # def get(self,request,format=None):
    #     tweet = Tweets.objects.all()
    #     tweet = TweetSerializer(tweet,many=True) 
        
        return JsonResponse(verify.uid,safe=False) 
    def get(self, request, format=None):
            print("Requested data",request.GET['id'])
            verify_uid=int(request.GET['id'])
            product = Product.objects.filter(uid=verify_uid)
            products=[]
            for i in product:
                products.append(i.name)

            return JsonResponse(products,safe=False)

  


class Added(APIView):
    def post(self, request, format=None):
        c=request.data['params']['c']
        product=request.data['params']['proName']
        keywords=request.data['params']['keywords']
        user = User.objects.get(uid=int(c)) 
        p=Product(uid=user,name=product)
        p.save()
        return JsonResponse("success",safe=False)


class Signup(APIView):
    
    def post(self, request, format=None):
       
        getemail=request.data['params']['email']
        getpassword=request.data['params']['password']
        p=User(email=getemail,password=getpassword)
        p.save()
        user = User.objects.latest('uid')
        # print(user.uid)
        return JsonResponse(user.uid,safe=False)
