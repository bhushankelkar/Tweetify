import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
import re
ps = PorterStemmer()
def preprocess(messages):
  corpus = []
  # hashtag =[]
  # hash_list=[]
  # nltk.download('stopwords')
  for i in range(0, len(messages)):
      
      # hash_list = re.findall(r"#(\w+)", messages[i])
      # hashtag.append(hash_list)
      review = re.sub(r'(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:\'".,<>?«»“”‘’]))',' ',messages[i])
      review = messages[i].lower()
      
      review = re.sub('[^a-zA-Z]', ' ', review)
      
      
      
      review = review.split()
      
      review = [ps.stem(word) for word in review if not word in stopwords.words('english')]
      review = ' '.join(review)
      corpus.append(review)
  
  return corpus

def extract_hashtag(messages):
  hashtag =[]
  hash_list=[]
  # nltk.download('stopwords')
  for i in range(0, len(messages)):
      
      hash_list = re.findall(r"#(\w+)", messages[i])
      hashtag.append(hash_list)
  return hashtag
