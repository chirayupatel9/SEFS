import pymongo
import os

DB_NAME = "pytask"
# Use local MongoDB instance
MONGODB_HOST = os.getenv('MONGODB_HOST', 'localhost')
MONGODB_PORT = int(os.getenv('MONGODB_PORT', 27017))

# Connect to local MongoDB instance
client = pymongo.MongoClient(f"mongodb://{MONGODB_HOST}:{MONGODB_PORT}/")

db = client.pytask
users = db.users
tasks = db.tasks

# Test connection
try:
    client.admin.command('ping')
    print("Successfully connected to MongoDB!")
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")
