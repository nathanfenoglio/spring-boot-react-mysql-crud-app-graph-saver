CRUD app using ReactJS, Spring Boot, and MySQL database
to store and provide the ability to save 
the representation of a directed/undirected graph of nodes and edges
represented by
	graph id
	graph name 
	image of drawn graph
	adjacency matrix representing the manner in which nodes are connected to each other
	note mappings mapping each node to a musical note
	user's personal notes about the usage of the graph
ability to create new graph, delete preexising graph, modify preexisting graph, view details of preexisting graph

used spring initializer from https://start.spring.io/ to set up spring boot backend
dependencies installed: 
Spring Web
Spring Data JPA
MySQL Driver
Spring Boot Dev Tools

to run in web browser:
open xampp control panel
start apache server
start mysql
(mysql database is on port 3306 and is created by spring boot utilizing hibernate
to create the database, the table, and the columns automatically when running spring boot application)
can run backend server by selecting "Run" in SaveGraphs1BackendApplication.java in vscode

front end:
used npx create-react-app to create front end project
npm install react-router-dom@5 to install version 5
cd directory to react_front_end_save_graphs_1/react_front_end_save_graphs_1/
npm start (in terminal)



