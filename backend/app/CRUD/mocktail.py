from fastapi import APIRouter
from db_config import conn
from models import mocktails
from schemas import Mocktail as mocktail

mock = APIRouter()

@mock.get("/mocktail")
async def retrieve_all_mocktail():
    return conn.execute(mocktails.select()).fetchall()

@mock.get("/mocktail/{id}")
async def retrieve_one_mocktail(id: int):
    return conn.execute(mocktails.select().where(mocktails.c.id == id)).fetchall()

@mock.post("/mocktail")
async def send_mocktail_data(mock: mocktail):
    conn.execute(mocktails.insert().values(
        owner = mock.owner,
        title = mock.title,
        ingredient = mock.ingredient,
        recipe = mock.recipe,
        desc = mock.desc,
        secret = mock.secret,
        image = mock.image
    ))
    return conn.execute(mocktails.select()).fetchall()

@mock.put("/mocktail/{id}")
async def update_mocktail_data(id: int, mock: mocktail):
    conn.execute(mocktails.update().values(
        owner = mock.owner,
        title = mock.title,
        ingredient = mock.ingredient,
        recipe = mock.recipe,
        desc = mock.desc
    ).where(mocktails.c.id == id))
    return conn.execute(mocktails.select()).fetchall()

@mock.delete("/mocktail/{id}")
async def delete_mocktail_data(id: int):
    conn.execute(mocktails.delete().where(mocktails.c.id == id))
    return conn.execute(mocktails.select()).fetchall()