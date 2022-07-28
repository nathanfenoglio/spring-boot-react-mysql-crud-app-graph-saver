import useFetch from "../hooks/useFetch";
import GraphList from "./GraphList";

const Home = () => {
    //data: graphs is a way to rename the variable in the useFetch hook to graphs even though it comes over as "data"
    const { error, isPending, data: graphs } = useFetch('http://localhost:8080/api/v1/graphs');
    return (
        // i don't see that he has home in his css file either
        <div className="home">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { graphs && <GraphList graphs={graphs} /> }
        </div>
    );
}
 
export default Home;