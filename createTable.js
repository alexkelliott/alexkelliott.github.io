var allProjects = [
    {
        "year":"2019",
        "projects" : [
            {
                "name": "Speed Snake",
                "link": "http://alexkelliott.github.io/SpeedSnake/",
                "description": "Snake game written in C for the Game Boy Advance. This project uses Direct Memory Access (DMA) to draw and update the screen. Arrow keys allow the player to control the snake to both collect apples and power-ups."
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
                "link": "http://subzerostudios.github.io/TowerDefense/",
                "description": "My first take on a tower defenese game in HTML5. Though some parts are incomplete, the game features a working console that takes user commands and alters the game."
            },
            {
                "name": "Memesweeper",
                "link": "http://subzerostudios.github.io/meme/",
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