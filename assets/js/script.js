$(document).ready(function () {

    $("form").submit(function (enviar) {
        enviar.preventDefault();
        let inputValue = $("#heroeInput").val();
    
        $.ajax({
            type: 'GET',
            url: 'https://superheroapi.com/api.php/4905856019427443/' + inputValue,
            dataType: 'json',
            success: function (data) {
                let nombre = data.name
                let imagen = data.image.url
                let conexiones = data.connections["group-affiliation"]
                let publicacion = data.biography.publisher
                let ocupacion = data.work.occupation
                let primeraAparicion = data.biography['first-appearance']
                let altura = data.appearance.height
                let peso = data.appearance.weight
                let alianzas = data.biography.aliases

                $('#infoHeroe').html(`
                    <div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${imagen}" class="img-fluid rounded-start">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">NOMBRE: ${nombre}</h5>
                                    <hr>
                                    <p class="card-text">CONEXIONES: ${conexiones}</p>
                                    <hr>
                                    <p class="card-text">PUBLICADO POR: ${publicacion}</p>
                                    <hr>
                                    <p class="card-text">OCUPACION: ${ocupacion}</p>
                                    <hr>
                                    <p class="card-text">PRIMERA APARICION: ${primeraAparicion}</p>
                                    <hr>
                                    <p class="card-text">ALTURA: ${altura}</p>
                                    <hr>
                                    <p class="card-text">PESO: ${peso}</p>
                                    <hr>
                                    <p class="card-text">ALIANZAS: ${alianzas}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `);  
                var chart = new CanvasJS.Chart("chartContainer", {
                    exportEnabled: true,
                    animationEnabled: true,
                    title:{
                        text: "State Operating Funds"
                    },
                    legend:{
                        cursor: "pointer",
                        itemclick: explodePie
                    },
                    data: [{
                        type: "pie",
                        showInLegend: true,
                        toolTipContent: "{name}: <strong>{y}%</strong>",
                        indexLabel: "{name} - {y}%",
                        dataPoints: [
                            
                            { y: `${data.powerstats.intelligence}`, name: "intelligence", exploded: true},
                            { y: `${data.powerstats.strength}`, name: "strength"},
                            { y: `${data.powerstats.speed}`, name: "speed"},
                            { y: `${data.powerstats.durability}`, name: "durability"},
                            { y: `${data.powerstats.power}`, name: "power"},
                            { y: `${data.powerstats.combat}`, name: "combat"}
                        ]
                    }]
                });
                chart.render();
                
                function explodePie (e) {
                    if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
                        e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
                    } else {
                        e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
                    }
                    e.chart.render();
                }
            },   
        })
    })
})