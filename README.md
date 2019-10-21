# AdTech_Heatmap

A web app that demos the ability to overlay a heatmap/choropleth visualizing
population, demographic, or or other data with a geo-spatial relationship.

This demo was created on Ubuntu 18

Requirements:

      mysql
      mysql-server
      mysql-workbench-communities
      nodejs
      npm

Data:

Pop Data by County:

Mysql Table Name: county_pop_est

        https://www2.census.gov/programs-surveys/popest/datasets/2010-2018/counties/asrh/cc-est2018-alldata.csv

County Shape File:

Mysql Table Name: county_shp

        https://www2.census.gov/geo/tiger/TIGER2019/COUNTY/tl_2019_us_county.zip

resize/generalize geometry with mapshaper.org if needed


Uploading Shape/geometry to mysql:

  In mysql-workbench:

    Go to the database you want to add the shape data into
    Right click
    Select Load Spatial Data
    Follow the wizard

Upload CSV Data to mysql:

  Ensure your table is already set up with the proper column headers
  On command line:

  Start mysql command line inside of the directory you have downloaded the CSV

  Enter these commands:

      SET GLOBAL local_infile = 1;
      load data local infile 'SAMPLEDATANAME.csv'
      into table county_pop_est
      fields terminated by ','
      lines terminated by '\n'
      ignore 1 lines;

  This method appeared to be much faster than doing it through mysql-workbench gui

Clone this github and go to the directory
inside the directory use
  npm install

This will install all node.js dependencies.
To start the server use:
  node back_server.js

  *I used another npm package called nodemon this would refresh the server
  any time something was changed
  npm install -g nodemon
  nodemon back_server.js*

Using a web browser you can now go to localhost:3000 to view the webpage.
