let dados; // Variável global para armazenar os dados
let dadosPsi;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const url = 'dados/pacientesMes.json';
        dados = await (await fetch(url)).json(); // Salva os dados na variável global

        let totalEnc = 0;
        let totalNL=0;
        let totalAte = 0;
        let totalConcl=0;
        let totalNovos=0
        dados.forEach((d)=>{
            console.log("d: "+d);
            totalEnc+=parseFloat(d[1]);
            totalNL+==parseFloat(d[2]);
            totalAte+=parseFloat(d[3]);
            totalConcl+=parseFloat(d[4]);
            totalNovos+=parseFloat(d[5]);
            console.log(totalEnc);                
        });
        document.getElementById('totalEnc').textContent = totalEnc;
        document.getElementById('totalNL').textContent = totalNL;
        document.getElementById('totalAte').textContent = totalAte;
        document.getElementById('totalConcl').textContent = totalConcl;
        document.getElementById('totalNovos').textContent = totalNovos;
        console.log(["total",totalEnc,totalAte, totalConcl,totalNovos])
        const totalPaci = totalEnc + totalNL + totalAte + totalConcl + totalNovos;
        document.getElementById('totalPaci').textContent = totalPaci;

        

        
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(() => drawChart(dados));
        
    } catch (error) {
        console.error('Erro:', error);
    }
    try {
        const urlPsi = 'dados/psicologosMes.json';
        dadosPsi = await (await fetch(urlPsi)).json(); // Salva os dadosPsi na variável global

        let totalM = 0;
        let totalF = 0;
        let totalNB = 0;
        dadosPsi.forEach((d)=>{
            console.log("d: "+d);
            totalM+=parseFloat(d[1]);
            totalF+=parseFloat(d[2]);
            totalNB+=parseFloat(d[3]);
            console.log(totalNB);                
        });
        const totalPsi = totalM+totalF+totalNB;
        document.getElementById('totalF').textContent = totalF;
        document.getElementById('totalM').textContent = totalM;
        document.getElementById('totalNB').textContent = totalNB;
        document.getElementById('totalPsi').textContent = totalPsi;                
        
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(() => drawChartPsi(dadosPsi));
        
    } catch (error) {
        console.error('Erro:', error);
    }
    try {
        const urlEst = 'dados/psicologosEstados.json';
        dadosEst = await (await fetch(urlEst)).json(); // Salva os dadosPsi na variável global
        google.charts.load('current', {'packages':['geochart']});
        google.charts.setOnLoadCallback(() => drawChartEst(dadosEst));
        
    } catch (error) {
        console.error('Erro:', error);
    }
});

function atuChart() {
    console.log("oi");
    const startMonthPaci = document.getElementById('startMonthPaci').value;
    const endMonthPaci = document.getElementById('endMonthPaci').value;
    const startYearPaci = document.getElementById('startYearPaci').value;
    const endYearPaci = document.getElementById('endYearPaci').value;

    console.log('Ano Inicial:', startYearPaci);
    console.log('Mês Inicial:', startMonthPaci);
    console.log('Ano Final:', endYearPaci);
    console.log('Mês Final:', endMonthPaci);
    
    const dadosFiltrados = dados.filter((data, i) => {
        //console.log([data[0] , new Date(startYearPaci, startMonthPaci, 1) ]);
        //console.log([data[0] , new Date(endYearPaci, endMonthPaci, 1) ]);
        return new Date(data[0]) >= new Date(startYearPaci, startMonthPaci, 1) &&
        new Date(data[0]) <= new Date(endYearPaci, endMonthPaci, 1);
    });
    let totalEnc = 0;
    let totalNL = 0;
    let totalAte = 0;
    let totalConcl=0;
    let totalNovos=0
    dadosFiltrados.forEach((d)=>{
        console.log("d: "+d);
        totalEnc+=parseFloat(d[1]);
        totalNL+=parseFloat(d[2]);
        totalAte+=parseFloat(d[3]);
        totalConcl+=parseFloat(d[4]);
        totalNovos+=parseFloat(d[5]);
        console.log("totalNovos: "+totalNovos);                
    });
    document.getElementById('totalEnc').textContent = totalEnc;
    document.getElementById('totalNL').textContent = totalNL;
    document.getElementById('totalAte').textContent = totalAte;
    document.getElementById('totalConcl').textContent = totalConcl;
    document.getElementById('totalNovos').textContent = totalNovos;
    console.log(["total",totalEnc,totalNL,totalAte, totalConcl,totalNovos])
    const totalPaci = totalEnc +totalNL + totalAte + totalConcl + totalNovos;
    document.getElementById('totalPaci').textContent = totalPaci;
              
    drawChart(dadosFiltrados);

}

function atuChartPsi() {
    const startMonth = document.getElementById('startMonthPsi').value;
    const endMonth = document.getElementById('endMonthPsi').value;
    const startYear = document.getElementById('startYearPsi').value;
    const endYear = document.getElementById('endYearPsi').value;

    //console.log('Ano Inicial:', startYear);
    //console.log('Mês Inicial:', startMonth);
    //console.log('Ano Final:', endYear);
    //console.log('Mês Final:', endMonth);

    const dadosFiltrados = dadosPsi.filter((data, i) => {
        //console.log([data[0] , new Date(startYear, startMonth, 1) ]);
        //console.log([data[0] , new Date(endYear, endMonth, 1) ]);
        return new Date(data[0]) >= new Date(startYear, startMonth, 1) &&
        new Date(data[0]) <= new Date(endYear, endMonth, 1);
    });

    let totalM = 0;
    let totalF = 0;
    let totalNB = 0;
    dadosFiltrados.forEach((d)=>{
        console.log("d: "+d);
        totalM+=parseFloat(d[1]);
        totalF+=parseFloat(d[2]);
        totalNB+=parseFloat(d[3]);
        console.log(totalNB);                
    });
    const totalPsi = totalM+totalF+totalNB;
    document.getElementById('totalF').textContent = totalF;
    document.getElementById('totalM').textContent = totalM;
    document.getElementById('totalNB').textContent = totalNB;
    document.getElementById('totalPsi').textContent = totalPsi;  
    
    drawChartPsi(dadosFiltrados);

}

//fazendo o gráfico
function drawChart(dadosFiltrados) {
    const dadosGra = dadosFiltrados.map((par) => {
        return [mesAno(par[0]), par[1], par[2], par[3], par[4], par[5]];
    });

    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Encaminhados');
    data.addColumn('number', 'Não Localizados');
    data.addColumn('number', 'Em Atendimento');
    data.addColumn('number', 'Concluídos');
    data.addColumn('number', 'Novos');

    // Adiciona as linhas aos dados
    dadosGra.forEach((linha) => {
        data.addRow([linha[0], linha[1], linha[2], linha[3], linha[4], linha[5]);
    });

    let options = {
        title: 'Número de Pacientes por Mês',
        hAxis: {
        title: 'Mês',
        slantedText: true,
        slantedTextAngle: 45,
        },
        vAxis: {
        title: 'Número de Pacientes',
        },
        isStacked: true, // Adiciona esta opção para empilhar as colunas
        legend: { position: 'top' }
    };

    let chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);
    //console.log(dadosGra);
}



//fazendo o gráfico psícologos
function drawChartPsi(dadosPsi) {
    const dadosGra = dadosPsi.map((par) => {
        return [mesAno(par[0]), par[1], par[2], par[3]];
    });

    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Masculino');
    data.addColumn('number', 'Feminino');
    data.addColumn('number', 'Não Binare');

    // Adiciona as linhas aos dados
    dadosGra.forEach((linha) => {
        data.addRow([linha[0], linha[1], linha[2], linha[3]]);
    });

    let options = {
        title: 'Número de Psis por Mês',
        hAxis: {
        title: 'Mês',
        slantedText: true,
        slantedTextAngle: 45,
        },
        vAxis: {
        title: 'Número de Píscologos',
        },
        isStacked: true, // Adiciona esta opção para empilhar as colunas
        legend: { position: 'top' }
    };

    let chart = new google.visualization.ColumnChart(document.getElementById('chartPsi_div'));
    chart.draw(data, options);
    //console.log(dadosGra);
}

//fazendo o gráfico Estados
function drawChartEst(dadosEst) {
    const dadosGra = dadosEst.map((par) => {
        return ["BR-"+par[0], par[1]];
    });
    dadosGra.unshift(['Estado','Nº Psis']);
    //console.log(dadosGra);
    let data = google.visualization.arrayToDataTable(dadosGra);

    /*// Adiciona as linhas aos dados
    dadosGra.forEach((linha) => {
        data.addRow([linha[0], linha[1], linha[2], linha[3]]);
    });*/

    let options = {
        region: 'BR', // Código de região para o Brasil
        resolution: 'provinces', // Exibe os estados brasileiros
        displayMode: 'regions',
        colorAxis: {colors: ['lightblue', 'darkblue']}
    };

    let chart = new google.visualization.GeoChart(document.getElementById('geochart'));

    chart.draw(data, options);
    //console.log(dadosGra);
}

function mesAno(dataString) {
    const mesesAbreviados = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const data = new Date(dataString);
    
    if (isNaN(data.getTime())) {
        return 'Data inválida';
    }

    const nomeMesAbreviado = mesesAbreviados[data.getMonth()];
    const ano = data.getFullYear();

    return `${nomeMesAbreviado} ${ano}`;
}
