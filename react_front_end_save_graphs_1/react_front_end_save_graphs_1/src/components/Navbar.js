import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Graphs</h1>
            {/* this is a Link not a button, but is styled like a button so that's kind of cool */}
            <div className="links">
                {/* react uses Link instead of <a></a> tags to be quicker and handle within the browser instead of having to go to the server */}
                <Link to="/" style={{
                    backgroundColor: 'yellow',
                    borderRadius: '8px'
                }}>Home</Link>
                <Link to="/create_graph" style={{ 
                  color: 'white', 
                  backgroundColor: '#f1356d',
                  borderRadius: '8px' 
                }}>New Graph</Link>
            </div>
        </nav>
    );
}

export default Navbar;