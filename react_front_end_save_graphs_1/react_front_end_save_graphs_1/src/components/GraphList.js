import { Link } from "react-router-dom";

const GraphList = ({graphs}) => {
    return (  
        // I don't see that there is a graph-list class in index.css or that he had a blog-list...
        <div className="graph-list">
            {graphs.map(graph => (
              <div className="graph-preview" key={graph.id}>
                <Link to={`/graphs/${graph.id}`}>
                    <h2>{ graph.graphName }</h2>
                    
                </Link>
              </div>  
            ))}
        </div>
    );
}
 
export default GraphList;