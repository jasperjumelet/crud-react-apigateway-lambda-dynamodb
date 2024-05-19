import json
import boto3
from decimal import Decimal
from datetime import datetime

client = boto3.client('dynamodb')
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("vochtbalans")
tableName = "vochtbalans"

def lambda_handler(event, context):
    print(event)
    body = {}
    statusCode = 200
    headers = {
        "Content-Type": "application/json"
    }
    current_datetime = datetime.now().isoformat()
   
    try:
        if event['routeKey'] == "DELETE /items/{id}":
            table.delete_item(
                Key={'id': event['pathParameters']['id']})
            body = 'Deleted item' + event['pathParameters']['id']
            
        elif event['routeKey'] == "GET /items/{id}":
            print("Got in the correct routeKey")
            body = table.get_item(
                Key={'id': event['pathParameters']['id']})
           
            body = body["Item"]
            responseBody = [
                {'datetime': body['datetime'], 'id': body['id'], 'volume': int(body['volume']), 'consumable': body['consumable']}]
            
            body = responseBody
            
        elif event['routeKey'] == "GET /items":
            body = table.scan()
            body = body["Items"]
            print("ITEMS---")
            print(body)
            responseBody = []
            for items in body:
                print(items)
                responseItems = [{'datetime': items['datetime'], 'id': items['id'], 'volume': items['volume'], 'consumable': items['consumable']}]
                responseBody.append(responseItems)
            body = responseBody
        
        elif event['routeKey'] == "PUT /items":
            requestJSON = json.loads(event['body'])
            table.put_item(
                Item={
                    'id': requestJSON['id'],
                    'datetime': current_datetime,
                    'volume': int(requestJSON['volume']),
                    'consumable': requestJSON['consumable']
                })
            body = "Put item " + requestJSON['id']
    except KeyError:
        statusCode = 400
        body = event
    body = json.dumps(body)
    res = {
        "statusCode": statusCode,
        "headers": {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'X-Requested-With': "*",
            'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE' 
        },
        "body": body
    }
    return res