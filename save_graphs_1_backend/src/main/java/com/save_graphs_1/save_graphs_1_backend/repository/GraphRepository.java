package com.save_graphs_1.save_graphs_1_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.save_graphs_1.save_graphs_1_backend.model.Graph;

@Repository
public interface GraphRepository extends JpaRepository<Graph, Long>{
    //JpaRepository has crud functions available to use and other stuff
}
