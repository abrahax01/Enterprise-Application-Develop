import React from "react";
import axios from "axios";

function Home(){
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      axios.get("/api")
        .then((res) => setData(res.data.message))
        .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <div>
                <h2>Home</h2>
                <p>{!data ? "Loading..." : data}</p>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="about">About</a></li>
                    <li><a href="app">App</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Home;
