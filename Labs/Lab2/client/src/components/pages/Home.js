import React from "react";

function Home(){
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      fetch("/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);

    return (
        <div>
            <div>
                <h2>Home</h2>
                <p>{!data ? "Loading..." : data}</p>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="about">About</a></li>
                    <li><a href="login">App</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Home;