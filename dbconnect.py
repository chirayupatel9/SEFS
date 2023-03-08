from datetime import datetime

from bson.json_util import dumps

from dbconfig import users, tasks

USER_SCHEMA = {
    "_id": "60756d56c44fb6fd55337f82",
    "user_id": 1,
    "name": "jondoe",

}
STATUS = ["PENDING", "INPROGRESS", "INREVIEW", "COMPLETED"]
STATUS_T = {
    "current_status": STATUS[0]

}

TASKS_SCHEMA = {
    "_id": "60756d56c44fb6fd55337f82",
    "task_id": 1,
    "title": "this is a task title",
    "description": "this is a task description",
    "ETA": "sometime",
    "current_status": STATUS[0],
    "PENDING": "datetime.now()",
    "INPROGRESS": "datetime.now()",
    "INREVIEW": "datetime.now()",
    "COMPLETED": "datetime.now()",
}

UPDATE_TASK_SCHEMA = {
    "_id": "60756d56c44fb6fd55337f82",
    "task_id": 1,
    "title": "this is a task title",
    "description": "this is a task description",
    "ETA": "sometime",
    "current_status": STATUS[2],
    "timestamp": datetime.now(),
}


def add_task(task):
    query = {"title": task['title']}
    if tasks.count_documents(query) == 1:
        return None
    x = tasks.insert_one(task)
    return task


# print(add_task(TASKS_SCHEMA))

def show_task():
    task = tasks.find({})
    list_task = list(task)
    json_data = dumps(list_task)
    return json_data


def update_task(task):
    query = {"title": task["title"]}
    if tasks.count_documents(query) == 1:
        x = tasks.update_one(query, {
            "$set": {"current_status": task["current_status"], task["current_status"]: datetime.now()}})
    return task
