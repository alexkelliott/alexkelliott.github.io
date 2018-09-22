/* update the year when you move the slider */
document.getElementById("year_display").innerHTML = document.getElementById("year").value;
document.getElementById("year").oninput = function() {
    document.getElementById("year_display").innerHTML = this.value;
    /*data.forEach(function(d){
        var year = d["date"].substr(d["date"].length - 4);
        if(year <= $('#year_display').html())
        {
            
        }
    });*/

    var animation_time = 500;

    for(var i = 0; i < data.length; i++)
    {
        var year = data[i]["date"].substr(data[i]["date"].length - 4);
        if(year <= $('#year_display').html())
        {
            $('#map_cover').children('div').each(function(){
                if($(this).attr("data") == i)
                {
                    $(this).fadeIn(animation_time);
                }
            });
        }
        else
        {
            $('#map_cover').children('div').each(function(){
                if($(this).attr("data") == i)
                {
                    $(this).fadeOut(animation_time);
                }
            });
        }
    }
}

/* animations for when the screen loads in */
$('body').hide();
$('body').fadeIn(500);

/* slider animations */
$('#year').on("mouseover", function(){
    $('#year').animate({
        "opacity":"1"
    }, 150,
    function(){
        
    }
)});

$('#year').on("mouseleave", function(){
    $('#year').animate({
        "opacity":"0.5"
    }, 150,
    function(){
        
    }
)});

/* chart handler */
var ctx = document.getElementById("refugee_chart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"],
        datasets: [{
            label: '# of Refugees',
            data: [21,	15,	2,	15,	41,	72,	129, 71, 111, 106, 240, 190, 515, 73, 1],
            // '04 [0, 0, 2, 5, 1, 0, 1, 0, 3, 4, 4, 3, 2, 3, 2] '18 restraunts per year
            backgroundColor: [
                'rgba(255, 0, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)'
            ],
            borderColor: [
                'rgba(255, 0, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(255, 0, 0, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Number of Refugees'
                  }
            }],
            xAxis: [{
                scaleLabel: {
                    display: true,
                    labelString: "Time in Seconds",
                    fontColor: "red"
                  }
            }]
        } 
    }
});


/* Read the json file */
// alert(data[0].lon);
id = 0;
data.forEach(function(d){
    var lat = d["lat"];
    var lon = d["lon"];

    var LEFT_OFFSET = -84.805748
    var TOP_OFFSET = 34.106004
    var dx = (lon - LEFT_OFFSET) * 113;
    var dy = (TOP_OFFSET - lat) * 210;


    $('#map_cover').append('<div class="data_point" style="left: '+dx+'%;top: '+dy+'%;" data="'+id+'"></div>');
    $('.data_point').hide();
    id += 1;
});

var initial_size = 12;
var selected_size = 20;
$('.data_point').on("mouseover", function(){
    console.log($(this).attr('data'));
    $(this).animate({
        "width":selected_size+"px",
        "height":selected_size+"px",
        "left":"-="+initial_size/2+"px",
        "top":"-="+initial_size/2+"px",
        "border-radius":selected_size+"px",
        "opacity":"1",
    },200);
});
$('.data_point').on("mouseleave", function(){
    $(this).animate({
        "width":initial_size+"px",
        "height":initial_size+"px",
        "left":"+="+initial_size/2+"px",
        "top":"+="+initial_size/2+"px",
        "border-radius":initial_size+"px",
        "opacity":"0.6",
    },200);
});