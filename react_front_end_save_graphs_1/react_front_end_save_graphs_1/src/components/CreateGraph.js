import { useState } from "react";
import { useHistory } from "react-router-dom";

const CreateGraph = () => {
    //useState is necessary to cause react to rerender and so update state in the browser
    //otherwise it won't
    //seems we always use the array of [the_value_itself, setTheValue]
    const [graphName, setGraphName] = useState();
    const [adjMatrix, setAdjMatrix] = useState();
    const [noteMappings, setNoteMappings] = useState();
    const [notesAboutGraph, setNotesAboutGraph] = useState();
    const [graphImage, setGraphImage] = useState(null);

    const history = useHistory();

    const handleSubmit = (e) => {
        //preventDefault is called on the event when submitting the form to prevent a browser reload/refresh
        e.preventDefault();
        //append all of the information to FormData object that will be received in spring boot backend as multipartFile
        //and values for each of the fields will be grabbed based on the string name that you provide
        const graphData = new FormData();
        graphData.append('graphImage', graphImage);
        graphData.append('graphName', graphName);
        graphData.append('adjMatrix', adjMatrix);
        graphData.append('noteMappings', noteMappings);
        graphData.append('notesAboutGraph', notesAboutGraph);

        //POST api request 
        fetch('http://localhost:8080/api/v1/graphs', {
            method: 'POST',
            //headers: { "Content-Type": "application/json" },
            //body: JSON.stringify(graph)
            //need to use body: graphData to send image
            body: graphData
        }).then( () => {
            history.push('/');
        })
    }

    return(
        <div className="create">
            <h2>Add A New Graph</h2>
            {/* you put onSubmit here with a form instead of onClick with the button */}
            <form onSubmit={handleSubmit}>
                <label>Graph Name:</label>
                <input 
                    type="text"
                    required
                    value={graphName}
                    onChange={ (e) => setGraphName(e.target.value)}
                />
                {/* graph's adjacency matrix */}
                <label>Adjacency Matrix:</label>
                <textarea
                    value={adjMatrix}
                    onChange={ (e) => setAdjMatrix(e.target.value)}
                />
                {/* graph nodes mapped to music notes */}
                <label>Note Mappings:</label>
                <textarea 
                    value={noteMappings}
                    onChange={ (e) => setNoteMappings(e.target.value)}
                />
                {/* section for just adding whatever personal notes about the graph */}
                <label>Notes About Graph:</label>
                <textarea
                    value={notesAboutGraph}
                    onChange={ (e) => setNotesAboutGraph(e.target.value)}
                />
                {/* adding graph image for screenshot */}
                <label>Graph Image Screenshot</label>
                <input 
                    //value={graphImage}
                    //gives error for type file if you try to set to something other than the empty string
                    value={""}
                    onChange={ (e) => setGraphImage(e.target.files[0]) }
                    type="file"
                />
                <button>Add Graph</button>
            </form>
        </div>
    );
}

export default CreateGraph;