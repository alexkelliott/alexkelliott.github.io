var allProjects = [
    {
        "year":"2019",
        "projects" : [
        ]
    },
    {
        "year":"2018",
        "projects" : [
            {
                "name": "Food Map of Atlanta",
                "link": "http://alexkelliott.github.io/foodmap/",
                "description": "Created for an English project, this project takes data of Middle-Eastern restaurants in Atlanta from Yelp and plots them on an interactive map."
            }
        ]
    },
    {
        "year":"2017",
        "projects" : [
        ]
    },
    {
        "year":"2016",
        "projects" : [
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
    document.write("<tr><td>" + y["year"] + "</td><td></ul>");
    y["projects"].forEach(function(project) {
        document.write("<li><a href='" + project["link"] + "'>"
            + project["name"] + "</a><p>" + project["description"]
            + "</p></li>");
    });
    document.write("</ul></td></tr>");
});

document.write("</table>");