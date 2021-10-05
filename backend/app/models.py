from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String , BLOB
from db_config import meta ,engine

mocktails = Table('mocktail', meta,
    Column('id', Integer, unique=True, primary_key=True),
    Column('owner',String(255)),
    Column('title', String(255)),
    Column('ingredient', String(999)),
    Column('recipe', String(999)),
    Column('desc', String(999)),
    Column('secret', String(255)), # mockteil password for edit and remove
    Column('image', String)
)

meta.create_all(engine)