from sqlalchemy import create_engine  
from sqlalchemy import Column, String  
from sqlalchemy.ext.declarative import declarative_base  
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Table, Column, String, TIMESTAMP,Integer

import datetime
from random import randint

db_string = 'postgres://matthewshaxted:postgres@localhost:5432/postgres'

db = create_engine(db_string)  
base = declarative_base()

class Data(base):
    __tablename__ = 'data'
    id = Column(Integer,primary_key=True)
    message = Column(String,default="Testing")
    createdAt = Column(TIMESTAMP,default=datetime.datetime.now)
    updatedAt = Column(TIMESTAMP,default=datetime.datetime.now)

Session = sessionmaker(db)  
session = Session()

base.metadata.create_all(db)

add=True
edit=False
values=10

if add==True:
    for i in range(0,values):
        new_data = Data(message='Testing')  
        session.add(new_data)  
elif add==False:
    users = session.query(Data).limit(values)
    for u in users:
        session.delete(u)  

if edit==True:
    data = session.query(Data).limit(values)
    for d in data:
        d.message="Testing-"+str(randint(1,100))

session.commit()  