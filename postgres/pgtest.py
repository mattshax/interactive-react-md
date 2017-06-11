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

class Users(base):
    __tablename__ = 'users'
    id = Column(Integer,primary_key=True)
    firstName = Column(String,default="COOL")
    lastName = Column(String,default="WORKS")
    createdAt = Column(TIMESTAMP,default=datetime.datetime.now)
    updatedAt = Column(TIMESTAMP,default=datetime.datetime.now)

Session = sessionmaker(db)  
session = Session()

base.metadata.create_all(db)

add=False
edit=True
values=10

if add==True:
    for i in range(0,values):
        new_user = Users(firstName='pgload-'+str(i))  
        session.add(new_user)  
elif add==False:
    users = session.query(Users).limit(values)
    for u in users:
        session.delete(u)  

if edit==True:
    users = session.query(Users).limit(values)
    for u in users:
        u.firstName="testing-"+str(randint(1,100))

session.commit()  