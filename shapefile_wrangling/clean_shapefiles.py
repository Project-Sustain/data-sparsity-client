import json

if __name__ == "__main__":
    output = []
    visited_nodes = set()

    fileObject = open("counties.json", "r")
    jsonContent = fileObject.read()
    counties = json.loads(jsonContent)
    for county in counties:
        gisjoin = county['GISJOIN']
        if gisjoin not in visited_nodes:
            visited_nodes.add(gisjoin)
            name = county['properties']['NAME']
            print(f'Processing {name}')
            coordinates = county['geometry']['coordinates']
            output.append({'name': name, 'gisjoin': gisjoin, 'coordinates': coordinates})
            print(f'processed {len(output)} counties')
    with open('counties_cleaned.json', 'w') as f:
        f.write(json.dumps(output))
    fileObject.close()