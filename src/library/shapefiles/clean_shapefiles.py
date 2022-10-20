import json

if __name__ == "__main__":

    fileObject = open("STATE.json", "r")
    jsonContent = fileObject.read()
    data = json.loads(jsonContent)

    feature_list = data['features'][:3]
    
    output = {
        "type": "FeatureCollection",
        "features": feature_list
    }

    with open('STATE_MINIMAL.json', 'w') as f:
        f.write(json.dumps(output))
        
    fileObject.close()