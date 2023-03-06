import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactSVG } from "react-svg";
import $ from 'jquery';

// Define state of component visibility of table, countries data, number of countries to display and some other one for jquery functionalities
function Home() {
    const [showTable, setShowTable] = useState(false);
    const [countryData, setCountryData] = useState([]);
    const [showAllCountries, setShowAllCountries] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [time, setTime] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [showFirstTwenty, setShowFirstTwenty] = useState(true);
    const [numOfCountries, setNumOfCountries] = useState(20);
    const [tableFade, setTableFade] = useState(false);
    const [filesRead, setFilesRead] = useState(false);
    const [highlightRows, setHighlightRows] = useState(false);
    const [textColour, settextColour] = useState('black');
    const [fontSize, setFontSize] = useState(16);
    const [isAnimated, setIsAnimated ] = useState(false)

    // Sets table data, executes only  when isLoading, isLoaded, and countryData states change
    useEffect(() => {
        if (!isLoading && !isLoaded && countryData.length > 0) {
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
            setLoadingMessage(`The folder (country data) has been read`)
        }
    }, [isLoading, isLoaded, countryData]);

    // Gets data from my server using Axios
    const fetchData = async () => {
        try {
            const startTime = new Date().getTime();
            const res = await axios.get('/fetch');
            setCountryData(res.data);
            setIsLoading(false);
            setLoadingMessage('All files have been read!');

            // Wait for 5 seconds before setting filesRead to true
            setTimeout(() => {
                setFilesRead(true);
            }, 5000);

            // Calculate the time taken
            const endTime = new Date().getTime();
            const timeTaken = (endTime - startTime) / 1000;
            setTime(`The table has been created and has taken ${timeTaken} seconds`)

        } catch (error) {
            console.error(error);
            setIsLoading(false);
            setLoadingMessage('Failed to fetch data');
        }
    };

    // shows 20 countries
    const showTwenty = () => {
        setShowFirstTwenty(true);
        setNumOfCountries(20);
    };

    // shows all countries
    const showAll = () => {
        setShowFirstTwenty(false);
        setNumOfCountries(tableData.length);
    };

    // Returns the table rows to display
    const getTableRows = () => {
        if (tableData.length === 0) {
            return [];
        }

        // Loops through the tableData state and creates a column for each country
        const rows = [];
        for (let i = 0; i < numOfCountries; i++) {
            const countryColumn = tableData[i];
            rows.push(
                <tr key={i}>
                    <td onClick={(event) => selectCell(event.target)}>{countryColumn[0]}</td>
                    <td onClick={(event) => selectCell(event.target)}>{countryColumn[1]}</td>
                    <td onClick={(event) => selectCell(event.target)}>{countryColumn[2]}</td>
                    <td onClick={(event) => selectCell(event.target)}>{countryColumn[3]}</td>
                    <td style={{ width: '50px', height: '50px', overflow: 'hidden' }}>
                        {countryColumn[4] !== '' && <ReactSVG src={countryColumn[4]} style={{ maxWidth: '50px', maxHeight: '50px', objectFit: 'cover', objectPosition: '50% 50%' }} />}
                    </td>
                    <td onClick={(event) => selectCell(event.target)}>{countryColumn[5]}</td>
                </tr>
            );
        }
        return rows;
    };

    // fade jquery
    const fadeTable = () => {
        setTableFade(!tableFade);

        if (tableFade) {
            $('#tableContent').fadeIn();
        } else {
            $('#tableContent').fadeOut();
        }
    };
      
    // change background jquery
    const toggleHighlight = () => {
        const rows = $('#tableContent tbody tr');
        if (highlightRows) {
            $('td').not('.selected').css('background-color', '');
            rows.css('background-color', '');
        } else {
            rows.filter(':even').css('background-color', 'lightgray');
            $('.selected').css('background-color', 'yellow');
        }
        setHighlightRows(!highlightRows);
    };

    // change text colour jquery
    const changeTextColour = () => {
        const tableContent = $('#tableContent tbody tr');
        const newColour = textColour === 'black' ? 'red' : 'black';
        tableContent.css('color', newColour);
        settextColour(newColour);
    };

    // increase font jquery
    const increaseFontSize = () => {
        const tableTitle = $('#tableContent');
        const tableContent = $('#tableContent tbody tr');
        const newFontSize = fontSize + 2;
        tableTitle.css('font-size', `${newFontSize}px`);
        tableContent.css('font-size', `${newFontSize}px`);
        setFontSize(newFontSize);
    };
    
    // decrease font jquery
    const decreaseFontSize = () => {
        const tableTitle = $('#tableContent');
        const tableContent = $('#tableContent tbody tr');
        const newFontSize = fontSize - 2;
        tableTitle.css('font-size', `${newFontSize}px`);
        tableContent.css('font-size', `${newFontSize}px`);
        setFontSize(newFontSize);
    };

    // animate content jquery
    const animateText = () => {
        const tableTitle = $('#tableContent');
        const tableContent = $('#tableContent tbody tr');

        if (!isAnimated) {
            tableTitle.animate({
                opacity: 0.7,
                letterSpacing: '5px'
            }, 1000, 'linear');
            
            tableContent.animate({
                opacity: 0.7,
                letterSpacing: '5px'
            }, 1000, 'linear');

            setIsAnimated(true)
        } else {
            tableTitle.animate({
                opacity: 1,
                letterSpacing: '0px'
            }, 1000, 'linear');

            tableContent.animate({
                opacity: 1,
                letterSpacing: '0px'
            }, 1000, 'linear');

            setIsAnimated(false)
        }
    };
    
    // Function to allow selection of cells
    function selectCell(cell) {
        const $cell = $(cell);
        const $tableCells = $('td');
      
        // Remove .selected class from all cells except the clicked cell
        $tableCells.not($cell).removeClass('selected');
      
        // Add .selected class to the clicked cell
        $cell.addClass('selected');
      
        // Set background colour based on highlightRows state
        if (highlightRows) {
            $tableCells.css('background-color', '');
            $tableCells.filter('.selected').css('background-color', 'yellow');
        } else {
            $tableCells.css('background-color', 'white');
            $tableCells.filter('.selected').css('background-color', 'yellow');
        }
    }
       
    return (
        <div>
            <h3>Technologies</h3>
            <p>"This website utilizes React and Axios technologies to access JSON objects, and Axios is a technology based
               on JavaScript that allows for dynamic loading of data without having to reload
               the entire page." 
               <br /><br />

               React is a JavaScript library for building user interfaces in web applications.
               <br /><br />

               Axios is built on top of the XmlHttpRequest (XHR) object, It can be used to retrieve data from an API endpoint
               or to send data to a server-side application.
               <br /><br />

               jQuery is a JavaScript library that simplifies HTML document traversing, event handling, animating, and AXIOS interactions for web development
               <br /><br />
               
               "JSON is a format for storing and exchanging data that is human-readable and easily parsed by computers."

            </p>
            <br />

            <h3>Table </h3>
            <button onClick={() => {fetchData(); setShowTable(!showTable);}}>
                {/* If table is displaying change button text to "hide" else button text is "show" */}
                {showTable ? 'Hide tableContent' : 'Show tableContent'}
            </button>

            {/* If loading is true display "text" else display all data */}
            {isLoading ? (<p>Click show table to start loading... </p>) : (
                <div>
                    <p>{loadingMessage}</p>
                    
                    <button onClick={() => setShowAllCountries(!showAllCountries)}>{showAllCountries ? 'Hide Countries Names' : 'Show Countries Names'}</button>
                    <br />
                    <br />

                    {/* Checks showAllCountries state is true to display data */}
                    {showAllCountries && (
                        <ul>
                            {countryData.map((country, index) => (
                                <li key={index}>{country.country}</li>
                            ))}
                        </ul>
                    )}
                    
                    {/* Checks showTable state is true to display data */}
                    {showTable && (
                        <div>
                            <p>{time}</p>
                            {tableData.length > 20 && (
                                <div>
                                    {showFirstTwenty ? (
                                        <div>
                                            <button onClick={showAll}>Show All</button>
                                            <button onClick={fadeTable}>{tableFade ? 'Unfade tableContent' : 'Fade tableContent'}</button>
                                            <button onClick={toggleHighlight}>{highlightRows ? 'Restore rows' : 'Highlight rows'}</button>
                                            <button onClick={changeTextColour}>{textColour === 'red' ? 'Change text colour back': 'Change text colour'}</button>
                                            <button onClick={increaseFontSize}>Increase font size</button>
                                            <button onClick={decreaseFontSize}>Decrease font size</button>
                                            <button onClick={animateText}>{isAnimated ? 'Animate text back' : 'Animate text'}</button>
                                        </div>
                                    ) : (<button onClick={showTwenty}>Show First 20</button>)}
                                    
                                    <br />
                                    <br />
                                </div>
                                
                            )}
                            <table id="tableContent">
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
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Home;
