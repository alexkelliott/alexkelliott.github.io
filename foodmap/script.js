/* update the year when you move the slider */
document.getElementById("year_display").innerHTML = document.getElementById("year").value;
document.getElementById("year").oninput = function() {
    document.getElementById("year_display").innerHTML = this.value;
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
        console.log("OVER");
    }
)});

$('#year').on("mouseleave", function(){
    $('#year').animate({
        "opacity":"0.5"
    }, 150,
    function(){
        console.log("UP");
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