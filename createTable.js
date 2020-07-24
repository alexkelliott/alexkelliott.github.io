var allProjects = [
    {
        "year":"2020",
        "projects" : [
            {
                "name": "Reaper Farm",
                "link": "/ReaperFarm",
                "description": "Project to autonomously grow Carolina Reaper pepper plants using a Raspberry Pi. What started as a simple watering and grow light toggling program now uses socket programming to allow devices on the network to monitor and control the plants over a TCP connection while data logging of soil moisture and light levels allows the Pi to send clients real-time data visualizations."
            },
            {
                "name": "Traveling Salesman",
                "link": "https://github.com/Bwaits2/tsp-project",
                "description": "An approach to the Traveling Salesman problem using Simulated-Annealing in C. Partner project for CS 3510 Design & Analysis of Algorithms."
            },
            {
                "name": "Analysis of Crime and its Influencing Agents",
                "link": "https://github.gatech.edu/wanyanwu3/CIAA",
                "description": "Group project for Emerging Database Technologies leveraging Apache Hadoop and Apache Hive to analyze the influence that weather patterns have on crime rates and crime types by querying a Big Data set."
            }
        ]
    },
    {
        "year":"2019",
        "projects" : [
            {
                "name": "Speed Snake",
                "link": "https://github.com/alexkelliott/alexkelliott.github.io/tree/master/SpeedSnake",
                "description": "Snake game written in C for the Game Boy Advance. This project uses Direct Memory Access (DMA) to draw and update the screen. Arrow keys allow the player to control the snake to both collect apples and power-ups."
            },
            {
                "name": "Space Pirates",
                "link": "https://github.gatech.edu/jylty3/SpacePirates",
                "description": "A space exploration game created with Python Flask for a semester-long group project in Intro to Software Engineering."
            },
            {
                "name": "B Extension",
                "link": "https://github.com/alexkelliott/alexkelliott.github.io/tree/master/BExtension",
                "description": "Google Chrome extension that turns B's on the page into emoji B's."
            }
        ]
    },
    {
        "year":"2018",
        "projects" : [
            {
                "name": "Food Map of Atlanta",
                "link": "http://alexkelliott.github.io/foodmap/",
                "description": "Created for an English project, this project takes data of Middle-Eastern restaurants in Atlanta from Yelp and plots them on an interactive map."
            },
            {
                "name": "Bubble Sort Visualizer",
                "link": "https://github.com/alexkelliott/alexkelliott.github.io/blob/master/sort/sorter.py",
                "description": "A bubble sort visualizion tool made using Pygame in Python."
            }
        ]
    },
    {
        "year": "2016",
        "projects": [
            {
                "name": "Electric Vehicle for Science Olympiad",
                "link": "http://alexkelliott.github.io/EV",
                "description": "This was a small electric vehicle that I made for a Science Olympiad tournament. You could select a distance on the car for it to travel and it would have to get as close to that distance as possible. I built it using an Arduino and a custom circuit to select the distance."
            }
        ]
    },
    {
        "year":"2015",
        "projects" : [
            {
                "name": "Custom Tower Defense",
                "link": "",
                "description": "My first take on a tower defenese game in HTML5. Though some parts are incomplete, the game features a working console that takes user commands and alters the game."
            },
            {
                "name": "Memesweeper",
                "link": "",
                "description": "A highly customizable version of minesweeper with multiple different gamemodes. Numbers are all replaced with memes."
            },
        ]
    },
];

document.write("<table>");

allProjects.forEach(function(y) {
    document.write("<tr><td>" + y["year"] + "</td><td><ul>");
    y["projects"].forEach(function(project) {
        document.write("<li><a href='" + project["link"] + "'>"
            + project["name"] + "</a><p>" + project["description"]
            + "</p></li>");
    });
    document.write("</ul></td></tr>");
});

document.write("</table>");
