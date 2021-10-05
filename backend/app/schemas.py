from pydantic import BaseModel

class Mocktail(BaseModel):
    owner: str
    title: str
    ingredient: str
    recipe: str
    desc: str
    secret: str
    image: str