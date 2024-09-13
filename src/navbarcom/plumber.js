import React, { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import Card from './Card';
import Data from "../db.json";

const Plumber = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [data, setData] = useState([]);

    useEffect(() => {
        // Initial data loading for 'Plumber' services
        const plumbers = Data.product.filter((item) => item.service === 'Plumber');
        setData(plumbers);
    }, []);

    const filterResult = (catItem) => {
        const result = Data.product.filter((curData) => curData.service === catItem);
        setData(result);
    };

    return (
        <div className='container'>
            <div className='row' style={{ width: "100%", marginTop: "-3.2rem" }}>
                <div className='col-12'>
                   
                </div>

                <div className='col-12'>
                    <div className='row' style={{ width: "100%" }}>
                        {data.map((prod) => (
                            <Card prod={prod} key={prod.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Plumber;
