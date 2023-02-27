import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactSVG } from "react-svg";

function Home() {
    const [showTable, setShowTable] = useState(false);
    const [countryData, setCountryData] = useState([]);
    const [showAllCountries, setShowAllCountries] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [showFirstTwenty, setShowFirstTwenty] = useState(true);
    const [numOfCountries, setNumOfCountries] = useState(20);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/fetch');
                setCountryData(res.data);
                setIsLoading(false);
                setLoadingMessage('All files have been read!');
            } catch (error) {
                console.error(error);
                setIsLoading(false);
                setLoadingMessage('Failed to fetch data');
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!isLoading && !isLoaded) {
            setIsLoaded(true);
            const countryTableData = [];
            for (const element of countryData) {
                const tableRow = [];
                tableRow.push(element.country || '-');
                tableRow.push(element.continent || '-');
                tableRow.push(element.currency || '-');
                tableRow.push(element.domain || '-');
                tableRow.push(element.flag !== '-' && element.flag !== null ? element.flag : '');
                tableRow.push(element.coastLine || '-');
                countryTableData.push(tableRow);
            }

            setTableData(countryTableData);
            setLoadingMessage(`The folder (country data) has been read`);
        }
    }, [isLoading, isLoaded, countryData]);

  const showTwenty = () => {
    setShowFirstTwenty(true);
    setNumOfCountries(20);
  };

  const showAll = () => {
    setShowFirstTwenty(false);
    setNumOfCountries(tableData.length);
  };

  const getTableRows = () => {
    const rows = [];
    for (let i = 0; i < numOfCountries; i++) {
        const countryRow = tableData[i];
        rows.push(
            <tr key={i}>
                <td>{countryRow[0]}</td>
                <td>{countryRow[1]}</td>
                <td>{countryRow[2]}</td>
                <td>{countryRow[3]}</td>
                <td style={{ width: '50px', height: '50px', overflow: 'hidden' }}>
                    {countryRow[4] !== '' && <ReactSVG src={countryRow[4]} style={{ maxWidth: '50px', maxHeight: '50px', objectFit: 'cover', objectPosition: '50% 50%' }} />}
                </td>
                <td>{countryRow[5]}</td>

            </tr>
        );
    }
    return rows;
  };

    return (
        <div>
            {isLoading ? (<p>Loading...</p>) : (
                <div>
                    <p>{loadingMessage}</p>
                    <button onClick={() => setShowTable(!showTable)}>Show Table</button>
                    {showTable && (
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Country</th>
                                        <th>Continent</th>
                                        <th>Currency</th>
                                        <th>Domain</th>
                                        <th>Flag</th>
                                        <th>Coast</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {getTableRows()}
                                </tbody>
                            </table>

                            <button onClick={showTwenty} disabled={showFirstTwenty}>Show First 20</button>
                            <button onClick={showAll} disabled={!showFirstTwenty}>Show All</button>
                        </div>
                    )}

                    <button onClick={() => setShowAllCountries(!showAllCountries)}>{showAllCountries ? 'Hide All Countries' : 'Show All Countries'}</button>
                    {showAllCountries && (
                        <ul>
                            {countryData.map((country, index) => (
                                <li key={index}>{country.country}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}

export default Home;
