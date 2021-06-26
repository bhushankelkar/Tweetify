"""mainapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from prediction import views
from prediction import getprediction
urlpatterns = [
    path('admin/', admin.site.urls),
    path('predict/$', views.Tweet_List.as_view()),
    # path('predict/client/', viewsclient.Tweet_List.as_view(), name = 'api_predict'),
    path('predict/', views.Tweet_List.as_view(), name = 'api_predict'),
    path('demo/', getprediction.Tweet_Label.as_view(), name = 'api_predict'),
    path('login/', views.Login.as_view()),
    path('login/$', views.Login.as_view()),
    path('added/', views.Added.as_view()),
    path('signup/', views.Signup.as_view()),
    
]
