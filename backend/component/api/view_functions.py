from rest_framework.response import Response
from rest_framework import status
from bson.json_util import dumps
from bson.objectid import ObjectId
from .serializers import *
import pymongo
import json
import datetime


def get_component(request):
    client = pymongo.MongoClient('mongodb://localhost:27017')
    db = client['ComponentReview']
    doc = db.component_component.find_one({'_id': ObjectId(request.query_params['_id']) })
    content = dumps(doc)
    resp = json.loads(content)
    return Response(resp, status=status.HTTP_200_OK)

def post_component(request):
    client = pymongo.MongoClient('mongodb://localhost:27017')
    db = client['ComponentReview']
    collection = db['component_component']
    doc = request.data
    doc["created"] = datetime.datetime.now()
    doc["updated"] = doc["created"]
    doc["comments"] = []
    serializer = ComponentSerializer(data=doc)
    if serializer.is_valid():
        collection.insert_one(doc)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def update_component(request):
    client = pymongo.MongoClient('mongodb://localhost:27017')
    db = client['ComponentReview']
    collection = db['component_component']
    collection.find_one_and_update(
        {"_id" : ObjectId(request.query_params['_id'])},
        {"$set":
            request.data
        },return_document=pymongo.ReturnDocument.AFTER
    )
    # content = dumps(doc)
    # resp = json.loads(content)
    return Response(status=status.HTTP_200_OK)
