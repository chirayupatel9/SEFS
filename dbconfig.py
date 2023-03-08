import pymongo

DB_NAME = "pytask"
# DB_USERNAME = "admin"
DB_USERNAME = "chirayu"
DB_PASS = "chirayu911"

# DB_PASS = "YaLtxqzWBseXTqQc"
# DB_PASS = "nnvwiZP1jNmkn2qK"
# URI = "mongodb+srv://chirayu:chirayu911@docs.hxuvi.mongodb.net/?retryWrites=true&w=majority"
# URI = "mongodb+srv://"+DB_USERNAME+":"+DB_PASS+"@cluster0.gnwyvcr.mongodb.net/?retryWrites=true&w=majority"
# CLIENT = pymongo.MongoClient(URI, connect=False)

# client = pymongo.MongoClient("mongodb+srv://chirayu_su:chirayu2099@docs.hxuvi.mongodb.net/?retryWrites=true&w=majority")

client = pymongo.MongoClient("mongodb+srv://chirayu_su:chirayu2099@cluster0.gt4cp.mongodb.net/?retryWrites=true&w=majority")
# db = client.test

db = client.pytask
users = db.users
tasks = db.tasks

dbs = client.test
# print(dbs.find({}))
# print(db.list_collection_names())
