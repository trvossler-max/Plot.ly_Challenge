// Get the data endpoint
const belly = "./samples.json";

// Fetch the JSON data and console log it
d3.json(belly).then(function(data) {
  console.log(data);
});

// Function for change on dropdown menu and load metadata
function getData(sample) {
  d3.json(belly).then((data) => {
    let metadata= data.metadata;
    let resultsarray= metadata.filter(sampleobject => 
      sampleobject.id == sample);
    let result= resultsarray[0]
    let panel = d3.select("#sample-metadata");
// Clear the panel for next ID selection
    panel.html("");
//Object.entries adds each key and value to the panel
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").html(`<strong>${key}:</strong> ${value}`);
    });
  });
}; 

// function to create Guage
function createGaugeChart(sample) {
    console.log(sample);
  
    d3.json(belly).then(data => {

      let selectedSampleObj = data.metadata.filter(sampleData => 
        sampleData["id"] === parseInt(sample));
  
      let sampleResult = selectedSampleObj[0];
    //log to console to check data
        console.log(sampleResult);

      const washFreq = sampleResult.wfreq;
    //log to console to check data
        console.log(washFreq);

      const guageData = [
        {
        domain: { x: [0, 1], y: [0, 1] },
        value: washFreq,
        title: { text: "<b>Belly Button Washing Frequency </b><br> (Scrubs Per Week)" },
        type: "indicator",
        mode: "gauge+number",     
        gauge: {
        axis: { range: [0,9] },
        bar: { color: "#F60E27" },
        steps: [
          { range: [0, 1], color: "#E4EAE8"},
          { range: [1, 2], color: "#CBE0DA" }, 
          { range: [2, 3], color: "#A8E0D0" },
          { range: [3, 4], color: "#8CD7C2" },
          { range: [4, 5], color: "#74C2AA" },
          { range: [5, 6], color: "#5CB89C" },
          { range: [6, 7], color: "#3AA382" },
          { range: [7, 8], color: "#176950" },
          { range: [8, 9], color: "#074532" }
                
        ],

       threshold: {
          value: washFreq
        }
      }
    }
  ]; 
    const guageLayout = {  width: 475, 
                   height: 350, 
                   margin: { t: 0, b: 0 },
                   xaxis: {zeroline:false, showticklabels:false,
                            showgrid:false, range: [-1, 1]},
                    };

 
 // Plot using Plotly
  Plotly.newPlot('gauge', guageData, guageLayout);
    });
};             

// Funtion to create charts
function createCharts(sample) {

  // Use `d3.json` to fetch the sample data for the plots
  d3.json(belly).then((data) => {
    let samples= data.samples;
    let resultsarray= samples.filter(sampleobject => 
        sampleobject.id == sample);
    let result= resultsarray[0]
  
    let ids = result.otu_ids;
    let labels = result.otu_labels;
    let values = result.sample_values;

    //console log to check sample data
    console.log(ids);
    console.log(labels);
    console.log(values);

  // Build a Bubble Chart
  let bubbleData =[
    {
      x: ids,
      y: values,
      mode: 'markers',
      marker: {
        color: ids,
        size: values,
        colorscale: "YlGnBu"
      }
    }
  ];
  // Set bubble chart layout
  let bubbleLayout = {
    xaxis: {title: 'OTU ID'},
    title: { text: "<b>Bacteria Cultures per Sample</b>" },
    plot_bgcolor: 'RGB (255, 242, 254)',
    paper_bgcolor: '#E3FBF3',
  };

  Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

  // Build a bar chart
    let barData =[
      {
        y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        x:values.slice(0,10).reverse(),
        text:labels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h"
      }
    ];
  
    let barLayout = {
      title: { text: "<b>Top 10 OTU's Found</b>" },
      width: 450,
      height: 550,
    };
  
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Creat init function
function init() {
  // Pull reference to the dropdown select element
  let selection = d3.select("#selDataset");
  
  // Use the list of sample names to create and populate the select options
  d3.json(belly).then((data) => {
    let sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selection
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  
    // Use the first sample from the list to build the default plots
    const initSample = sampleNames[0];
    createCharts(initSample);
    getData(initSample);
    createGaugeChart(initSample);
  });
  }
  
  function optionChanged(newId) {
  // Fetch new data each time a new sample ID is selected is selected
  createCharts(newId);
  getData(newId);
  createGaugeChart(newId)
  }
  
  // Initialize the dashboard
  init();