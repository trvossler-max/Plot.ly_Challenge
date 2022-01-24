# Plot.ly - Interactive visualization of Belly Button Biodiversity Dataset

![screen shot](Images/Ploty_Biodiversity.png)

This project builds an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## The project includes the following:

1. Use of the D3 library to read in `samples.json`, plotly, JS, HTML, JSON, and CSS.

2. Creation of a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

  ![bar Chart](Images/hw01.png)

3. Creation of a bubble chart that displays each sample.

![Bubble Chart](Images/Bubble.png)

4. A panel that displays the sample metadata, i.e., an individual's demographic information.

![hw](Images/hw03.png)

5. A guage chart that plots the weekly washing frequency of the individual.

![Weekly Washing Frequency Gauge](Images/Guage.png)

6. A drop-down selection that update all of the plots any time that a new sample is selected.

## Deployment

* The app is deployed on GitHub pages or can be viewed using Live Server in visual studio with the data files, js, and css.
 

app.js - Includes code for the basic dashboard plots

bonus.js = Includes code for the basic dashboard plots plus the guage and additional formatting and customization to give the dashboard a better appearance.

## File Structure
data folder - includes the data in a json file used for the project
Images folder - Includes images used for the readme file
Starter code - includes the index.htl file and style.css
  Status Subfolder - Includes the js files used for the web dashboard