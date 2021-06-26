from rest_framework import serializers
from .models import Tweets

class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tweets
        fields='__all__'



class Test(serializers.Serializer):
  
    text = serializers.CharField(max_length=200)
    
