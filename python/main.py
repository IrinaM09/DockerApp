from elasticsearch import Elasticsearch
import elasticsearch
import logging
import sys
import json
import requests
from flask import Flask, request
from flask_restful import Api
from flask_cors import CORS

# Author: Irina Mitocaru

doc = {}
users_index = "users"
MAX_SIZE = 1000
app = Flask(__name__)
api = Api(app)
CORS(app)
es = Elasticsearch()


# Set logging INFO as default level
def set_logger():
    logging.getLogger().setLevel(logging.INFO)


# connect to Elasticsearch cluster
def connect_to_cluster():
    try:
        global es

        # es = Elasticsearch([{'host': 'es', 'port': 9200}])
        es = Elasticsearch([{'host': 'es', 'port': 9200}])
        logging.info("Connection to Elasticsearch cluster is working\n")
        return es

    except False:
        logging.error("Connection to Elasticsearch cluster is not working\n")
        sys.exit(1)


# login user
@app.route("/login", methods=['POST'])
def login():
    global es, res
    global users_index

    print("[login] started")

    # parse the received data
    data_received = request.get_json()
    email = data_received['email']
    password = data_received['password']
    print(data_received)

    try:
        es.indices.refresh(index=users_index)

        # search for user with given credentials
        res = es.search(index=users_index,
                        body={"query": {
                            "bool": {
                                "must": [
                                    {"match_phrase": {"email": email}},
                                    {"match_phrase": {"password": password}}
                                ]
                            }},
                            "size": MAX_SIZE
                        },
                        request_cache=True)

        if not res['hits']['hits']:
            print("No user found with given credentials")
            return {}

        # get the data from the query and store it in a array of users
        for user in res['hits']['hits']:
            user = {
                "email": user['_source']['email'],
                "password": user['_source']['password'],
                "accessToken": user['_source']['accessToken'],
                "cities": user['_source']['cities']
            }
            return user

    except elasticsearch.exceptions.NotFoundError:
        print("Index users Not Found")
        return {}


# add a city to a user
@app.route("/add_city", methods=['POST'])
def add_city():
    global es, res
    global users_index

    print("[add_city] started")

    # parse the received data
    data_received = request.get_json()
    accessToken = data_received['accessToken']
    city = data_received['city']
    print(data_received)

    try:
        es.indices.refresh(index=users_index)

        # search for user with given credentials
        res = es.search(index=users_index, body={"query": {"match_phrase": {"accessToken": {"query": accessToken}}}},
                        request_cache=True)

        if not res['hits']['hits']:
            print("No user found with given token")
            return {}

        # get the data from the query and store it in a array of users
        for user in res['hits']['hits']:
            user = {
                "email": user['_source']['email'],
                "password": user['_source']['password'],
                "accessToken": user['_source']['accessToken'],
                "cities": user['_source']['cities']
            }

            # add the new city to the list
            if city not in user["cities"]:
                user["cities"].append(city)

            res = es.update(index=users_index,
                            doc_type='_doc',
                            id=user["email"],
                            body={"doc": {
                                'email': user["email"],
                                'password': user["password"],
                                'accessToken': user["accessToken"],
                                'cities': user["cities"]
                            }})
        return res

    except elasticsearch.exceptions.NotFoundError:
        print("Index users Not Found")
        return {}


# get the city list of a user
@app.route("/get_cities", methods=['POST'])
def get_cities():
    global es, res
    global users_index

    print("[get_cities] started")

    # parse the received data
    data_received = request.get_json()
    accessToken = data_received['accessToken']
    print(data_received)

    try:
        es.indices.refresh(index=users_index)

        # search for user with given credentials
        res = es.search(index=users_index, body={"query": {"match_phrase": {"accessToken": {"query": accessToken}}}},
                        request_cache=True)

        if not res['hits']['hits']:
            print("No user found with given token")
            return {}

        # get cities list
        user = {}
        for user in res['hits']['hits']:
            user = {
                "cities": user['_source']['cities']
            }

        return user

    except elasticsearch.exceptions.NotFoundError:
        print("Index users Not Found")
        return {}


def main():
    global es

    set_logger()
    es = connect_to_cluster()


if __name__ == '__main__':
    main()

    # run Flask server
    app.run(host='0.0.0.0', port=5002)
