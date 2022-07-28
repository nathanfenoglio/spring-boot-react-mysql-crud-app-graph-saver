package com.save_graphs_1.save_graphs_1_backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

//The @Entity annotation specifies that the class is an entity and is mapped to a database table
//rad when you annotate @Table and give it a name and @Column and give it a name, 
//hibernate creates these tables and columns for you in mysql workbench
@Entity
@Table(name = "graphs")
public class Graph {
    //The @Id annotation specifies the primary key of an entity 
    //and the @GeneratedValue provides for the specification of generation strategies for the values of primary keys
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //probably will use something like a date 7_20_22 or if it involves a particular song can reference that or something
    @Column(name = "graph_name")
    private String graphName; //@Column takes care of creating the column names in the database

    //just representing adjacency matrix as a 1D string 
    @Column(name = "adj_matrix")
    //private ArrayList < ArrayList <Integer> > adjMatrix;
    private String adjMatrix;

    @Column(name = "note_mappings")
    //private ArrayList <Integer> noteMappings;
    private String noteMappings;

    //add an image column for a screenshot of the graph
    @Column(name = "graph_image", length = 2000000) //max length 2MB
    private byte[] graphImage;

    //add a notes column for personal notes relating to the graph
    //seems that it is not saving when a larger amount of characters, haven't tested yet what the limit is 
    //addin length = 2000000 to see if it will fix
    //changed application.properties file to have &jdbcCompliantTruncation=false at the end of spring.datasource.url=jdbc:mysql://localhost:3306/graphs_1?createDatabaseIfNotExist=true&jdbcCompliantTruncation=false
    //and that seems to have fixed the character limit thing    
    @Column(name = "notes_about_graph", length = 2000000)
    private String notesAboutGraph;

    //have to create a default constructor because hibernate uses it to create property objects or something 
    public Graph(){

    }

    public Graph(String graphName, String adjMatrix, String noteMappings, byte[] graphImage, String notesAboutGraph){
        this.graphName = graphName;
        this.adjMatrix = adjMatrix;
        this.noteMappings = noteMappings;
        this.graphImage = graphImage;
        this.notesAboutGraph = notesAboutGraph;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getGraphName() {
        return graphName;
    }

    public void setGraphName(String graphName) {
        this.graphName = graphName;
    }

    public String getAdjMatrix() {
        return adjMatrix;
    }

    public void setAdjMatrix(String adjMatrix) {
        this.adjMatrix = adjMatrix;
    }

    public String getNoteMappings() {
        return noteMappings;
    }

    public void setNoteMappings(String noteMappings) {
        this.noteMappings = noteMappings;
    }

    public byte[] getGraphImage() {
        return graphImage;
    }

    public void setGraphImage(byte[] graphImage) {
        this.graphImage = graphImage;
    }

    public String getNotesAboutGraph() {
        return notesAboutGraph;
    }

    public void setNotesAboutGraph(String notesAboutGraph) {
        this.notesAboutGraph = notesAboutGraph;
    }

}
