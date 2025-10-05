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
    if tasks.count_documents(query) >= 1:
        return None
    
    # Set initial status and timestamp
    task["current_status"] = task.get("current_status", "Pending")
    task["PENDING"] = datetime.now()
    
    x = tasks.insert_one(task)
    return task


# print(add_task(TASKS_SCHEMA))

def show_task():
    task_list = []
    for task in tasks.find({}):
        task_list.append(task)
    
    # Convert ObjectId to string for JSON serialization
    new_dict = json.loads(bson.json_util.dumps(task_list))
    return new_dict


# print(show_task())


def update_task_status(task):
    query = {"title": task["title"]}
    if tasks.count_documents(query) >= 1:
        update_data = {
            "current_status": task["current_status"],
            task["current_status"]: datetime.now()
        }
        x = tasks.update_one(query, {"$set": update_data})
        return task
    return None


def update_task(task):
    query = {"title": task["title"]}
    if tasks.count_documents(query) >= 1:
        update_data = {}
        if "ETA" in task:
            update_data["ETA"] = task["ETA"]
        if "Assignee" in task:
            update_data["Assignee"] = task["Assignee"]
        if "description" in task:
            update_data["description"] = task["description"]
        
        x = tasks.update_one(query, {"$set": update_data})
        return task
    return None


# print(update_task(UPDATE_TASK_SCHEMA))
