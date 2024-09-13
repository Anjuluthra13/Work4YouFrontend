import React, { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import Card from './Card';
import Data from "../db.json";

const Cook = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [data, setData] = useState([]);

    useEffect(() => {
        // Adjusted data loading for correct 'Cooking' services
        const cookingServices = Data.product.filter((item) =>
            item.service === 'cook provider' || item.service === 'baker'
        );
        setData(cookingServices);
    }, []);

    const filterResult = (catItem) => {
        const result = Data.product.filter((curData) => curData.service === catItem);
        setData(result);
    };

    return (
        <div className='container'>
            <div className='row' style={{ width: "100%", marginTop: "-3.2rem" }}>
                <div className='col-12'>
                    {/* Add any additional UI components or headers here */}
                </div>

                <div className='col-12'>
                    <div className='row' style={{ width: "100%" }}>
                        {data.length > 0 ? (
                            data.map((prod) => (
                                <Card prod={prod} key={prod.id} />
                            ))
                        ) : (
                            <p>No cooking services available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cook;
