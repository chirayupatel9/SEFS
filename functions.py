from datetime import datetime
import bson.json_util
from bson.json_util import dumps, loads
import json
from dbconfig import users, tasks

USER_SCHEMA = {
    "_id": "60756d56c44fb6fd55337f82",
    "user_id": 1,
    "name": "jondoe",

}
STATUS = ["Pending", "InProgress", "InReview", "Completed"]

TASKS_SCHEMA = {
    "title": "this is a task title",
    "description": "this is a task description",
    "current_status": STATUS[0],
    "ETA": "send-date-time of completion",
    "Assignee": "someone",
    "PENDING": "datetime.now()",
    "INPROGRESS": "datetime.now()",
    "INREVIEW": "datetime.now()",
    "COMPLETED": "datetime.now()",
}

UPDATE_TASK_STATUS_SCHEMA = {
    "title": "this is a task title",
    "description": "this is a task description",
    "ETA": "sometime",
    "current_status": STATUS[2],
    "timestamp": datetime.now(),
}
UPDATE_TASK_SCHEMA = {
    "title": "this is a task title",
    "description": "this is a task description",
    "Assignee":"haha",
    "ETA": datetime.now(),
    "timestamp": datetime.now(),
}


def add_task(task):
    query = {"title": task['title']}
    if tasks.count_documents(query) == 1:
        return None
    x = tasks.insert_one(task)
    x = tasks.update_one(query, {
        "$set": {"current_status": task["current_status"], "PENDING": datetime.now()}})
    return task


# print(add_task(TASKS_SCHEMA))

def show_task():
    task = tasks.find({})
    list_task = list(task)
    json_data = dumps(list_task)
    # print(task)
    new_dict = []
    for x in tasks.find({}):
        new_dict.append(x)
        # print(x)

    # print(new_dict)
    new_dict = json.loads(bson.json_util.dumps(new_dict))
    return new_dict


# print(show_task())


def update_task_status(task):
    query = {"title": task["title"]}
    if tasks.count_documents(query) == 1:
        x = tasks.update_one(query, {
            "$set": {"current_status": task["current_status"], task["current_status"]: datetime.now()}})
    return task


def update_task(task):
    query = {"title": task["title"]}
    if tasks.count_documents(query) == 1:
        x = tasks.update_one(query, {
            "$set": {"ETA": task["ETA"], "Assignee": task["Assignee"]}})
    return task


# print(update_task(UPDATE_TASK_SCHEMA))
