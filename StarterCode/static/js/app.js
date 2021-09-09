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
    panel.html("");
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
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

  // Build a bar chart
    let bar_data =[
      {
        y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        x:values.slice(0,10).reverse(),
        text:labels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h"
  
      }
    ];
  
    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };
  
    Plotly.newPlot("bar", bar_data, barLayout);
  });
  }

// Creat init function
function init() {
  // Grab a reference to the dropdown select element
  let selection = d3.select("#selDataset");
  
  // Use the list of sample names to populate the select options
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
  });
  }
  
  function optionChanged(newId) {
  // Fetch new data each time a new sample is selected
  createCharts(newId);
  getData(newId);
  }
  
  // Initialize the dashboard
  init();