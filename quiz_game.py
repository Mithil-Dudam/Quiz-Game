import random

print("Quiz Game!\n")

qandans={"How many continents are present ?":7,
    "Whats the largest Country ?":"Russia",
    "How many planets are there in the solar system ?":8,
    "How many elements are currently present ?":118,
    "How many colors in the rainbow ?":7
}
options = {"How many continents are present ?":{5,6,7,8},
    "Whats the largest Country ?":{"Russia","Brazil","Canada","Australia"},
    "How many planets are there in the solar system ?":{6,7,8,9},
    "How many elements are currently present ?":{114,120,116,118},
    "How many colors in the rainbow ?":{6,7,8,9}
}

#print(qandans)
quizlist = list(qandans.items())
#print(quizlist)
random.shuffle(quizlist)
quiz = dict(quizlist)
#print(quiz)
count=0
correct=0
wrong=0

def inpans():
    answer=input("\nEnter option number: ")
    if(answer.isdigit()):
        answer=int(answer)
        if(1<=answer<=4):
            return answer
        else:
            print("Enter your choice between 1 and 4.")
            return inpans()
    else:
        print("Invalid Input! Enter a Number.")
        return inpans()

def checkans(question,answer):
    global correct,wrong
    if(quiz[question]==answer):
        print("Correct!\n")
        correct+=1
    else:
        print("Wrong!")
        wrong+=1
        print(f"The correct answer was {quiz[question]}\n")


anslist=[]
for i in quiz:
    print(f"Question {count+1}: {i}\n")
    count +=1
    optlist = options[i]
    optlist = list(optlist)
    random.shuffle(optlist)
    temp=0
    for j in range(len(optlist)):
        print(f"Option {temp+1}. {optlist[j]}")
        temp+=1
    answer=inpans()
    checkans(i,optlist[answer-1])

print(f"Score: {correct}/{len(quizlist)}")