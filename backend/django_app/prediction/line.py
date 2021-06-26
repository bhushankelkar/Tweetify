import pandas as pd
import dateutil
df=pd.read_csv('C:\\Users\\Vedita\\Desktop\\Projects\\Tweet\\backend\\Tweetify\\backend\\django_app\\prediction\\demo1.csv')
print(df.head())
# df['date']=df['date'].apply(dateutil.parser.parse,dayfirst=True)
# print(type(df['date']))
print(df.head())
new_df= (pd.get_dummies(df,columns=["label"]))
new_df= new_df.groupby(['date'],as_index=False).sum()
new_df['date']=new_df['date'].astype(str)
line_daily= (new_df.to_dict('list'))
print(line_daily)