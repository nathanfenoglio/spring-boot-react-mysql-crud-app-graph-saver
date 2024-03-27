# Graph Traversal Sequencer
CRUD app using ReactJS, Spring Boot, and MySQL database </br>
to store and provide the ability to save </br>
the representation of a directed/undirected graph of nodes and edges </br>
represented by </br>
	* graph id 
	* graph name 
	* image of drawn graph 
	* adjacency matrix representing the manner in which nodes are connected to each other 
	* note mappings mapping each node to a musical note 
	* user's personal notes about the usage of the graph 
ability to create new graph, delete preexising graph, modify preexisting graph, view details of preexisting graph </br>

used spring initializer from https://start.spring.io/ to set up spring boot backend </br>
dependencies installed: </br>
Spring Web </br>
Spring Data JPA </br>
MySQL Driver </br>
Spring Boot Dev Tools </br>

to run in web browser: </br>
open xampp control panel </br>
start apache server </br>
start mysql </br>
(mysql database is on port 3306 and is created by spring boot utilizing hibernate </br>
to create the database, the table, and the columns automatically when running spring boot application) </br>
can run backend server by selecting "Run" in SaveGraphs1BackendApplication.java in vscode </br>

front end: </br>
used npx create-react-app to create front end project </br>
npm install react-router-dom@5 to install version 5 </br>
cd directory to react_front_end_save_graphs_1/react_front_end_save_graphs_1/ </br>
npm start (in terminal) </br>



