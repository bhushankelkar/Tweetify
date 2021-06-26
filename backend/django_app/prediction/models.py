from django.db import models


class User(models.Model):
    uid = models.AutoField(primary_key=True,unique=True)
    email= models.EmailField(max_length=70,blank=False)
    password = models.CharField(max_length=100)
 
class Product(models.Model):
    pid=models.AutoField(primary_key=True,unique=True)
    name=models.CharField(max_length=70)
    uid = models.ForeignKey(User, on_delete=models.CASCADE,default='0')

class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


