from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http.response import JsonResponse
from rest_framework.views import APIView
from prediction.apps import PredictionConfig
#from . models import Tweets
# from . serializers import TweetSerializer,Test
import urllib.parse
from . models import User,Product
from . ML_product import pred as pred
from . ML_product import count as count
from . ML_product import frequent as frequent
from .ML_product import get_frequent_hashtags as hashtag
from .ML_product import get_line_chart_daily,get_keyword_chart,get_company_sentiment,get_company_line_chart
# Create your views here.
# Class based view to predict based on IRIS model
class Tweet_List_View(APIView):
    def get(self, request, format=None):
        pro_name=""
        pro_name = pro_name.join(request.GET['text'])
        pro_name=urllib.parse.unquote(pro_name) # Returns 'https://www.amazon.com/s?k=hbb magic dress'
        pro_namer=urllib.parse.unquote(pro_name).replace(" ","") 
        keywords = request.GET['keywords']
        keywords = keywords.split(' ')
        print("Pro name",pro_name)
        print("Keywords",keywords)
        print("Keywords",type(keywords))
        print("Pro_name",type(pro_name))
        #keywords = keywords[1:]
        #print("Requested data",request.GET['text'])
        string = " "
        string = string.join(keywords)
        string = str(pro_name + " " +string)
        print("string",string)
        label,tweet_array=pred(string)
        merged=hashtag(tweet_array,label)
        tweet_array=tweet_array[0:10]
        freq_array=frequent(tweet_array[0:100])
        pos,neg,neu=count(label)
        line_daily = (get_line_chart_daily(pro_name))
        keyword = get_keyword_chart(string,keywords)
        counts={
            'positive':pos,'negative':neg,'neutral':neu,'tweets':tweet_array,
            'freq_array':freq_array,'hashtag':merged,
            'line_daily':line_daily,'keyword':keyword,
            
            
            }
        return Response(counts, status=status.HTTP_201_CREATED)
      
 
class Tweet_List_Compare(APIView):
    def get(self, request, format=None):
        pro_name=""
        pro_name = pro_name.join(request.GET['text'])
        
        pro_name=urllib.parse.unquote(pro_name) # Returns 'https://www.amazon.com/s?k=hbb magic dress'
        #pro_name=urllib.parse.unquote(pro_name).replace(" ","") 
        keywords = request.GET['keywords']
        keywords = keywords.split(' ')
        print("Pro name 1",pro_name)
        print("Keywords",keywords)
        #print("Requested data",request.GET['text'])
        #label,tweet_array=pred(request.GET['text'])
        #merged=hashtag(tweet_array,label)
        #tweet_array=tweet_array[0:10]
        #freq_array=frequent(tweet_array[0:100])
        #pos,neg,neu=count(label)
        #line_daily = (get_line_chart_daily(pro_name))
        
        #keyword = get_keyword_chart(request.GET['text'],keywords)
        
        pro2_name = request.GET['text1']
        # pro2_name=urllib.parse.unquote(pro2_name) # Returns 'https://www.amazon.com/s?k=hbb magic dress'
        # pro2_name=urllib.parse.unquote(pro2_name).replace(" ","") 
        print("Prod 1",pro_name)
        print("Prod 2",pro2_name)
        string = " "
        string = string.join(keywords)
        
        pro_search = str(pro_name + " " +string) 
        pro1_search = str(pro2_name + " " + string)
        
        print("Pro search",type(pro_search))
        print("Pro 1 search",type(pro1_search))
        company1_sentiment,company2_sentiment = get_company_sentiment(pro_search,pro1_search,keywords)
        days = int(float(request.GET['days']))
        line1,line2 = get_company_line_chart(days,pro_name,pro2_name)
      
        
        print("Keywords",type(keywords))
       
        
        c1 = get_keyword_chart(pro_search,keywords)
        c2 = get_keyword_chart(pro1_search,keywords)
        counts={
            
            
            'company1_sentiment':company1_sentiment,
            'company2_sentiment':company2_sentiment,
            'company1_line':line1,
            'company2_line':line2,
            'company1_key':c1,
            'company2_key':c2,
            'pro1':pro_name,
            'pro2':pro2_name
            
            }
        return Response(counts, status=status.HTTP_201_CREATED)  
class Delete(APIView):
    def get(self, request, format=None):
        
        verify_uid=int(request.GET['id'])
        name = request.GET['name']
       
        Product.objects.filter(uid=verify_uid).filter(name=name).delete()
        return JsonResponse("success",safe=False)

class Login(APIView):
    
    def post(self, request, format=None):
        print("not")
        getemail=request.data['params']['email']
        getpassword=request.data['params']['password']
        verify = User.objects.filter(email=getemail)[0]
        print("verify",verify)
        if verify.password == getpassword:
            
            # print("here1 ",products)
            #print("verified",verify.uid)
            product = Product.objects.filter(uid=verify.uid)
            products=[]
            for i in product:
                products.append(i.name)
            
        
            





        
        return JsonResponse(verify.uid,safe=False) 
    
    def get(self, request, format=None):
            #print("Requested data",request.GET['id'])
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

