from django.contrib import admin
from . models import User,Product
from django.apps import AppConfig
import pandas as pd
from tensorflow.keras.models import model_from_json
import os
import pickle

admin.site.register(User)
admin.site.register(Product)
# Register your models here.



class PredictionConfig(AppConfig):
    name = 'prediction'

    json_file = open('C:\\Users\\Bhushan\\OneDrive\\Documents\\Tweetify-1-master\\backend\\django_app\\prediction\\Rnn.json', 'r')

    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
# load weights into new model

    loaded_model.load_weights("C:\\Users\\Bhushan\\OneDrive\\Documents\\Tweetify-1-master\\backend\\django_app\\prediction\\weights.h5")

    print("Loaded model from disk")
   
 
# evaluate loaded model on test data
    # loaded_model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

    with open('C:\\Users\\Bhushan\\OneDrive\\Documents\\Tweetify-1-master\\backend\\django_app\\prediction\\tokenizer.pickle', 'rb') as handle:

        tokenizer = pickle.load(handle)
    
    

    

