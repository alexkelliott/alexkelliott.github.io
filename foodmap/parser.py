import json
from pprint import pprint

with open('here_you_go.json') as x:
    establishments = json.load(x)
    rperyear = []
    for i in range(15):
        rperyear += [0]
        
    for place in establishments:
        #print("{}, {}, {}, #F00".format(place["lat"], place["lon"], place["name"]))
        print("{}\t{}\t{}".format(place["lat"], place["lon"], place["name"]))
        #print(place["date"][-4:])
        #rperyear[int(place["date"][-4:]) - 2004] += 1
    #print(rperyear)

    #for x in range(len(rperyear)):
    #    print(str(2004 + x) + ": " + str(rperyear[x]))

    #print(rperyear)
    
"""
[
    {
        "name": "Persepolis Persian Cuisine",
        "date": "11/20/2007",
        "lat": 33.930697,
        "lon": -84.379097
    },
    {
        "name": "Zafron Restaurant",
        "date": "5/14/2012",
        "lat": 33.9256820678711,
        "lon": -84.380012512207
    }
]
"""
