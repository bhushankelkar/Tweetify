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
        #keywords = keywords[1:]
        #print("Requested data",request.GET['text'])
        string = ""
        string = string.join(keywords)
        label,tweet_array=pred(pro_name + " " +string)
        merged=hashtag(tweet_array,label)
        tweet_array=tweet_array[0:10]
        freq_array=frequent(tweet_array[0:100])
        pos,neg,neu=count(label)
        line_daily = (get_line_chart_daily(pro_name))
        
        keyword = get_keyword_chart(pro_name + " " +string,keywords)
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
        pro_name=urllib.parse.unquote(pro_name).replace(" ","") 
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
        pro2_name=""
        pro2_name = pro2_name.join(request.GET['text1'])
        # pro2_name=urllib.parse.unquote(pro2_name) # Returns 'https://www.amazon.com/s?k=hbb magic dress'
        # pro2_name=urllib.parse.unquote(pro2_name).replace(" ","") 
        string = ""
        string = string.join(keywords)
        
        pro_search = pro_name + " " +string 
        pro1_search = pro2_name + " " + string
        print("Pro 1 search",pro1_search)
        print("Pro search",pro_search)
        company1_sentiment,company2_sentiment = get_company_sentiment(pro_search,pro1_search,keywords)
        days = int(float(request.GET['days']))
        line1,line2 = get_company_line_chart(days,pro_name,pro2_name)
        
        c1 = get_company_keyword(pro_search,keywords)
        c2 = get_company_keyword(pro1_search,keywords)
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