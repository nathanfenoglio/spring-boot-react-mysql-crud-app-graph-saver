//custom hook
//hook files must start with "use"
//They let you use state and other React features without writing a class
//Hooks allow you to reuse stateful logic without changing your component hierarchy. 
//This makes it easy to share Hooks among many components 
import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        //can be used to stop a fetch when you add it as 2nd arg to fetch
        //needed to clean up in case page routes are clicked on quick enough before fetch is complete
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal})
            .then(res => { //wait for fetch to return
                if(!res.ok){ // error coming back from server
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => { //wait for res.json() to return
                setIsPending(false);
                setData(data);
                setError(null);
            })
            .catch(err => {
                if(err.name === 'AbortError'){ //don't update state if is caused by aborting fetch
                    console.log('fetch aborted');
                }
                else{
                    // auto catches network / connection error
                    setIsPending(false);
                    setError(err.message);
                }
            })

        // abort the fetch
        //this is needed to "clean up" like if you clicked from route to route real quick and the fetch was not done you would get an error otherwise
        return () => abortCont.abort();

    }, [url])
    //[url] is the condition that when changed will call the useEffect function. 
    //If blank it will be called once when the page loads and then never again
    
    return { data, isPending, error};
}
 
export default useFetch;