from rest_framework.response import Response
from rest_framework import status
from bson.json_util import dumps
from bson.objectid import ObjectId
import pymongo
import json
import datetime
from accounts.models import UserProfile

def get_component(request):
    client = pymongo.MongoClient('mongodb://localhost:27017')
    db = client['ComponentReviewDB']
    doc = db.components.find_one({'_id': ObjectId(request.query_params['_id']) })
    content = dumps(doc)
    resp = json.loads(content)
    return Response(resp, status=status.HTTP_200_OK)

def post_component(request):
    client = pymongo.MongoClient('mongodb://localhost:27017')
    db = client['ComponentReviewDB']
    collection = db['components']
    doc = request.data
    doc["rating"] = {
                        "total": request.data["rating"],
                        "votes": 1,
                        "avg_rating": request.data["rating"]
                    }
    doc["comments"] = []
    doc["created"] = datetime.datetime.now()
    doc["updated"] = doc["created"]
    result = collection.insert(doc)
    data = collection.find_one({'_id': ObjectId(result) })

    user = UserProfile.objects.get(user__username=doc["who"])
    user.posts_made.append(result)
    user.save()

    content = dumps(data)
    resp = json.loads(content)
    return Response(resp, status=status.HTTP_201_CREATED)

def update_component(request):
    change_occured = False
    client = pymongo.MongoClient('mongodb://localhost:27017')
    db = client['ComponentReviewDB']
    collection = db['components']
    doc = request.data

    if "name" in request.data:
        collection.update({'_id': ObjectId(doc['id']) }, {'$set': {'name': doc["name"]}})
        change_occured = True

    if "picture" in request.data:
        collection.update({'_id': ObjectId(doc['id']) }, {'$push': {'picture': doc["picture"]}})
        change_occured = True

    if "category" in request.data:
        collection.update({'_id': ObjectId(doc['id']) }, {'$set': {'category': doc["category"]}})
        change_occured = True

    if "manufacture_name" in request.data:
        collection.update({'_id': ObjectId(doc['id']) }, {'$set': {'manufacture_name': doc["manufacture_name"]}})
        change_occured = True

    if "manufacture_num" in request.data:
        collection.update({'_id': ObjectId(doc['id']) }, {'$set': {'manufacture_num': doc["manufacture_num"]}})
        change_occured = True

    if "price" in request.data:
        collection.update({'_id': ObjectId(doc['id']) }, {'$set': {'price': doc["price"]}})
        change_occured = True

    if "datasheet" in request.data:
        collection.update({'_id': ObjectId(doc['id']) }, {'$push': {'datasheet': doc["datasheet"]}})
        change_occured = True

    if "specifications" in request.data:
        collection.update({'_id': ObjectId(doc['id']) }, {'$push': {'datasheet': doc["specifications"]}})
        change_occured = True

    if "review" in request.data:
        collection.update({'_id': ObjectId(doc['id']) }, {'$set': {'review': doc["review"]}})
        change_occured = True

    if "rating" in request.data:
        collection.update({'_id': ObjectId(doc['id']) }, {'$inc': {'rating.total': doc["rating"]}})
        collection.update({'_id': ObjectId(doc['id']) }, {'$inc': {'rating.votes': 1}})
        data = collection.find_one({'_id': ObjectId(doc['id']) })
        new_avg_rating = data['rating']['total'] / data['rating']['votes']
        collection.update({'_id': ObjectId(doc['id']) }, {'$set': {'rating.avg_rating': new_avg_rating}})
        change_occured = True

    if change_occured == True:
        collection.update({'_id': ObjectId(doc['id']) }, {'$set': {'updated': datetime.datetime.now()}})
        data = collection.find_one({'_id': ObjectId(request.data['id']) })
        content = dumps(data)
        resp = json.loads(content)
        return Response(resp, status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

def delete_component(request):
    client = pymongo.MongoClient('mongodb://localhost:27017')
    db = client['ComponentReviewDB']
    collection = db['components']
    doc = collection.find_one({'_id': ObjectId(request.query_params['_id']) })

    user = UserProfile.objects.get(user__username=doc["who"])
    user.posts_made.remove(request.query_params['_id'])
    user.save()

    result = collection.delete_one({'_id': ObjectId(request.query_params['_id'])})


    return Response(status=status.HTTP_200_OK)

def post_comment(request):
    client = pymongo.MongoClient('mongodb://localhost:27017')
    db = client['ComponentReviewDB']
    collection = db['components']
    comment = request.data['comments']
    comment["created"] = datetime.datetime.now()
    comment["up_vote"] = 0
    comment["down_vote"] = 0
    collection.update({'_id': ObjectId(request.data['id']) }, {'$push': {'comments': comment}})

    data = collection.find_one({'_id': ObjectId(request.data['id']) })
    content = dumps(data)
    resp = json.loads(content)

    return Response(resp, status=status.HTTP_201_CREATED)

def update_vote(request):
    client = pymongo.MongoClient('mongodb://localhost:27017')
    db = client['ComponentReviewDB']
    collection = db['components']

    if request.data["up_vote"]:
        collection.update({'_id': ObjectId(request.data['id']), "comments.comment": request.data["comment"] },
                            {'$inc': {'comments.$.up_vote': 1}},
                            False,
                            True)
        data = collection.find_one({'_id': ObjectId(request.data['id']) })
        content = dumps(data)
        resp = json.loads(content)

        return Response(resp, status=status.HTTP_201_CREATED)

    elif request.data["down_vote"]:
        collection.update({'_id': ObjectId(request.data['id']), "comments.comment": request.data["comment"] },
                            {'$inc': {'comments.$.down_vote': 1}},
                            False,
                            True)
        data = collection.find_one({'_id': ObjectId(request.data['id']) })
        content = dumps(data)
        resp = json.loads(content)

        return Response(resp, status=status.HTTP_201_CREATED)

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


def general_filter_component(request):
    general = request.query_params["general"]
    general_arr = general.split()
    num_general_array = general.split()
    for item in num_general_array:
        try:
            float(item)
        except ValueError:
            continue


    client = pymongo.MongoClient('mongodb://localhost:27017')
    db = client['ComponentReviewDB']
    collection = db['components']

    query = { "$or": [
                {"name": {"$in": general_arr}},
                {"category": {"$in": general_arr}},
                {"manufacture_name": {"$in": general_arr}},
                {"manufacture_num": {"$in": general_arr}},
                {"manufacture_num": {"$in": general_arr}},
                {"price": {"$lte": {"$in": num_general_array}}},
                {"specifications": {"$in": general_arr}},
                {"rating": {"$gte": {"$in": num_general_array}}}
            ]}

    data = collection.find(query)
    content = dumps(data)
    resp = json.loads(content)
    if resp == []:
        return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(resp, status=status.HTTP_200_OK)


def key_filter_component(request):
    client = pymongo.MongoClient('mongodb://localhost:27017')
    db = client['ComponentReviewDB']
    collection = db['components']

    query = { "$and": [] }


    if "name" in request.query_params:
        query["$and"].append({"name":  request.query_params["name"]})

    if "category" in request.query_params:
        category = request.query_params["category"].split(",")
        query["$and"].append({"category": { "$in": category}})

    if "manufacture_name" in request.query_params:
        man_name = request.query_params["manufacture_name"].split(",")
        print(man_name)
        query["$and"].append({"manufacture_name": { "$in": man_name}})

    if "manufacture_num" in request.query_params:
        man_num = request.query_params["manufacture_num"].split(",")
        query["$and"].append({"manufacture_num": { "$in": man_num}})

    if "price" in request.query_params:
        query["$and"].append({"price": {"$lte": float(request.query_params["price"])}})

    if "specifications" in request.query_params:
        spec = request.query_params["specifications"].split(",")
        query["$and"].append({"specifications": { "$in": spec}})

    if "rating" in request.query_params:
        query["$and"].append({"rating": {"$gte": float(request.query_params["rating"])}})


    data = collection.find(query)
    content = dumps(data)
    resp = json.loads(content)
    if resp == []:
        return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(resp, status=status.HTTP_200_OK)
