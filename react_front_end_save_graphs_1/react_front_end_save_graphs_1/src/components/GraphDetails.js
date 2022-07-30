import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import UpdateGraph from "./UpdateGraph";
import { Link } from "react-router-dom";

const GraphDetails = () => {
    //useParams gets the id at the end of the route specified with the : in front of the id in the route like "/graphs/:id"
    const { id } = useParams();

    const { data: graph, error, isPending } = useFetch('http://localhost:8080/api/v1/graphs/' + id);

    //need to check if graph is not null before getting the graph image base64 data array from spring boot
    //to feed into the img component
    let byteArr = null;
    let imgSrc = null;
    if(graph){
        byteArr = graph.graphImage;
        // `data:image/jpeg;base64, needed in front of the base64 byte array that you receive back from spring boot to convert to jpeg image to display
        imgSrc = `data:image/jpeg;base64,${byteArr}`;
    }

    const history = useHistory();

    //DELETE GRAPH
    const handleDeleteClick = () => {
        fetch('http://localhost:8080/api/v1/graphs/' + graph.id, {
        //method is the optional 2nd parameter init that you can pass to the fetch function to specify GET, POST, PUT, DELETE
            method: 'DELETE'
        }).then(() => {
          //history.push pushes the specified endpoint onto the page display stack or whatever it's called
          history.push('/');
        })
    }

    return(
        <div className="graph-details">
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div>}
            { graph && (
                <article>
                    <h2>{ graph.graphName }</h2>
                    <button onClick={handleDeleteClick}>DELETE</button>
                    <Link to={"/update_graph/" + id} style={{ 
                      color: 'white', 
                      backgroundColor: 'blue',
                      padding: '4px',
                      marginLeft: '40px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                    }}>MODIFY</Link>
                    <br/>
                    <img alt="graph_image" className="img" src={imgSrc} />                    
                    <h3> Adjacency Matrix </h3>
                    <div>{ graph.adjMatrix }</div>
                    <h3> Note Mappings </h3>
                    <div>{ graph.noteMappings }</div>
                    <div>{ graph.notesAboutGraph }</div>
                    <br/>

                </article>
            )}
        </div>
    );
}

export default GraphDetails;