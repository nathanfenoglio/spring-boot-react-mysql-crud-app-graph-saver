// created route /update_graph/:id
import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { Buffer } from 'buffer';

const UpdateGraph = () => {
    //accept prop of the graph id
    //useParams gets the id at the end of the route specified with the : in front of the id in the route like "/graphs/:id"
    const { id } = useParams();

    const { data: graph } = useFetch('http://localhost:8080/api/v1/graphs/' + id);

    //check if graph is not null before getting the graph image base64 data array from spring boot
    //to feed into the img component
    let byteArr = null;
    let imgSrc = null;
    if(graph){
        byteArr = graph.graphImage;
        console.log(byteArr.type);
        // `data:image/jpeg;base64, needed in front of the base64 byte array that you receive back from spring boot to convert to jpeg image to display
        imgSrc = `data:image/jpeg;base64,${byteArr}`;
    }

    if(graph){
        console.log(graph);
    }

    const history = useHistory();

    const [newGraphImage, setNewGraphImage] = useState(null);

    //need to convert the base64 encoded image to Uint8 encoding and specify type
    //originally type in inspector shows as Content-Type: application/octet-stream
    const convertBase64ToImageBlob = (data) => {
        const buffer = Buffer.from(data, 'base64');
        const arraybuffer = Uint8Array.from(buffer).buffer;
        return new Blob([arraybuffer], { type: 'image/jpeg', filename: 'blob' });
    }    

    const handleModifySubmit = (e) => {
        e.preventDefault(); //preventDefault is needed to not have the page reload immediately
        //just printing to the console for reference
        console.log("handleModifySubmit");
        console.log(graph.graphName);
        console.log(graph.adjMatrix);
        console.log(graph.noteMappings);
        console.log(graph.notesAboutGraph);
        console.log(graph.graphImage);
        console.log(graph.graphImage.type);

        const graphData = new FormData();
        //need to convert image to blob to send back to spring boot backend
        let graphImageAsBlob;
        if(newGraphImage){
            console.log(newGraphImage.type);
            graphImageAsBlob = new Blob([newGraphImage], {type: newGraphImage.type});
        }
        else{
            //needed to convert to uint8 encoding type: image/jpeg  
            //tried these originally which did not work          
            //graphImageAsBlob = new Blob([graph.graphImage], {type: graph.graphImage.type});
            //graphImageAsBlob = new Blob([graph.graphImage], {type: 'image/jpeg'});
            graphImageAsBlob = convertBase64ToImageBlob(graph.graphImage);
            //for some reason type shows as undefined here...
            console.log(graphImageAsBlob.type);
        }

        //need to convert image to blob to send back to spring boot backend
        graphData.append('graphImage', graphImageAsBlob);
        //graphData.append('graphImage', graph.graphImage);
        graphData.append('graphName', graph.graphName);
        graphData.append('adjMatrix', graph.adjMatrix);
        graphData.append('noteMappings', graph.noteMappings);
        graphData.append('notesAboutGraph', graph.notesAboutGraph);

        //PUT api request 
        fetch('http://localhost:8080/api/v1/update_graph/' + id, {
             method: 'PUT',
             body: graphData
         }).then( () => {
             history.push('/');
         })

    }

    return(
        //display the graph's information in the boxes with ability to be modified
        <div>
            <h1>Update Graph Id: {id}</h1>
            <h2></h2>
            <div className="create">    
                {/* you put onSubmit here with a form instead of onClick with the button */}
                { graph && <form onSubmit={handleModifySubmit}>
                    <h1> {graph.graphName} </h1>
                    <label>Graph Name:</label>
                    <input 
                        type="text"
                        required
                        defaultValue={graph.graphName}
                        onChange={ (e) => graph.graphName = e.target.value}
                    />
                    <label>Adjacency Matrix:</label>
                    <textarea
                        defaultValue={graph.adjMatrix}
                        onChange={ (e) => graph.adjMatrix = e.target.value}
                    />
                    <label>Note Mappings:</label>
                    <textarea 
                        defaultValue={graph.noteMappings}
                        onChange={ (e) => graph.noteMappings = e.target.value}
                    />
                    {/* section for just adding whatever personal notes about the graph */}
                    <label>Notes About Graph:</label>
                    <textarea
                        defaultValue={graph.notesAboutGraph}
                        onChange={ (e) => graph.notesAboutGraph = e.target.value}
                    />
                    {/* adding graph image for screenshot */}
                    <label>Graph Image Screenshot</label>
                    <img src={imgSrc} />                    
                    <input 
                        //gives error for type file if you try to set to something other than the empty string
                        defaultValue={""}
                        //need to convert pre-existing image encoding to uint8 encoding from base 64 if new image is not selected to update
                        onChange={ (e) => setNewGraphImage(e.target.files[0]) }
                        type="file"
                    />
                    <button>Submit Update</button>

                </form>

            }
            </div>
        </div>
    );
}

export default UpdateGraph;