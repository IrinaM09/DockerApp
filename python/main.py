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

        es = Elasticsearch([{'host': 'localhost', 'port': 9201}])
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

    return 'ok'
    # try:
    #     es.indices.refresh(index=users_index)

    #     # search for user with given credentials
    #     res = es.search(index=users_index, body={"query": {
    #         "bool": {
    #             "must": [
    #                 {"match_phrase": {"email": email}},
    #                 {"match_phrase": {"password": password}}
    #             ]
    #         }
    #     }})

    #     if not res['hits']['hits']:
    #         print("No user found with given credentials")
    #         return {}

    #     print("%d users found: %s \n" % (res['hits']['total']['value'], res))

    #     # get the data from the query and store it in a array of books
    #     for user in res['hits']['hits']:
    #         user = {
    #             "email": user['_source']['email'],
    #             "username": user['_source']['username'],
    #             "password": user['_source']['password'],
    #             "accessToken": user['_source']['accessToken'],
    #         }
    #         return user
    #     else:
    #         return {}

    # except elasticsearch.exceptions.NotFoundError:
    #     print("Index users Not Found")
    #     return {}

def main():
    global es

    set_logger()
    #es = connect_to_cluster()


if __name__ == '__main__':
    main()

    # run Flask server
    app.run(host='0.0.0.0', port=5002)
