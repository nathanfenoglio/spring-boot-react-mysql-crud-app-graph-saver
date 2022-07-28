package com.save_graphs_1.save_graphs_1_backend.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.save_graphs_1.save_graphs_1_backend.exception.ResourceNotFoundException;
import com.save_graphs_1.save_graphs_1_backend.model.Graph;
import com.save_graphs_1.save_graphs_1_backend.repository.GraphRepository;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1") //will be included in the following route names
public class GraphController {
    @Autowired
    private GraphRepository graphRepository;

    //findAll graphs
    @GetMapping("/graphs")
    public List<Graph> getAllGraphs(){
        return graphRepository.findAll();
    }

    //create graph REST api
    @PostMapping("/graphs")
    //@PostMapping("/graphs/create_graph")
    //need to take in a @RequestParam("imageFile") MultipartFile file, 
    //"imageFile" is just the name that you named the MultipartFile image in the front end 
    //I THINK THAT YOU COULD JUST APPEND THE graph OBJECT TO THE FormData OBJECT THAT YOU WOULD BE SENDING OVER
    //can append every field to the MultipartFile file in front end to then grab separately here based on the @RequestParam name  
    public Graph createGraph(@RequestParam("graphImage") MultipartFile graphImage, @RequestParam("graphName") String graphName, @RequestParam("adjMatrix") String adjMatrix, @RequestParam("noteMappings") String noteMappings, @RequestParam("notesAboutGraph") String notesAboutGraph) throws IOException{
        Graph graph = new Graph(graphName, adjMatrix, noteMappings, graphImage.getBytes(), notesAboutGraph);
        graphRepository.save(graph);
        return graph;
    }

    //get graph by id rest api
    @GetMapping("/graphs/{id}")
    public ResponseEntity<Graph> getGraphById(@PathVariable Long id){
        Graph graph = graphRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("no graph exists with id " + id));

        return ResponseEntity.ok(graph);
    }

    //update graph api
    @PutMapping("/update_graph/{id}")
    public ResponseEntity<Graph> updateGraph(@PathVariable Long id, @RequestParam("graphImage") MultipartFile graphImage, @RequestParam("graphName") String graphName, @RequestParam("adjMatrix") String adjMatrix, @RequestParam("noteMappings") String noteMappings, @RequestParam("notesAboutGraph") String notesAboutGraph) throws IOException{
        Graph graph = graphRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("no graph exists with id " + id));

        graph.setGraphName(graphName);
        graph.setAdjMatrix(adjMatrix);
        graph.setNoteMappings(noteMappings);
        graph.setGraphImage(graphImage.getBytes());
        graph.setNotesAboutGraph(notesAboutGraph);
        
        Graph updatedGraph = graphRepository.save(graph);
        return ResponseEntity.ok(updatedGraph);
    }

    @DeleteMapping("graphs/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteGraph(@PathVariable Long id){
        Graph graph = graphRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("no graph exists with id " + id));

        graphRepository.delete(graph);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    
}
