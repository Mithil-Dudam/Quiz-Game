# Quiz Game

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
import random

app=FastAPI()

origins = ['http://localhost:5173']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

questions = {
    1:{
        "question":"How many continents are present ?",
        "options":["5","6","7","8"],
        "answer":"7"
    },
    2:{
        "question":"Whats the largest Country ?",
        "options":["Russia","Brazil","Canada","Australia"],
        "answer":"Russia"
    },
    3:{
        "question":"How many planets are there in the solar system ?",
        "options":["6","7","8","9"],
        "answer":"8"
    },
    4:{
        "question":"How many elements are currently present ?",
        "options":["114","120","116","118"],
        "answer":"118"
    },
    5:{
        "question":"How many colors in the rainbow ?",
        "options":["6","7","8","9"],
        "answer":"7"
    }
}

count=0
correct=0
wrong=0

@app.post("/check/{q_id}",status_code=status.HTTP_200_OK)
async def check(q_id:int,ans:str):
    global count,correct,wrong
    count+=1
    if(ans == questions[q_id]["answer"]):
        correct+=1
        return {"result":"correct"}
    else:
        wrong+=1
        return {"result":"incorrect"}
    
question_list = list(questions.keys())
@app.get("/question",status_code=status.HTTP_200_OK)
async def question():
    if len(question_list) == 0:
        return {"message":"Quiz over","count":count,"correct":correct,"wrong":wrong}
    q_no = random.choice(question_list)
    question_list.remove(q_no)
    return {"question":questions[q_no],"q_id":q_no}