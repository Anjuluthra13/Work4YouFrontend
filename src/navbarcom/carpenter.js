import React, { useState, useEffect } from 'react';
import Card from './Card';
import Data from "../db.json";

const Carpenter = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [data, setData] = useState([]);

    useEffect(() => {
        // Initial data loading for 'Carpenter' services
        const carpenterServices = Data.product.filter((item) => item.service === 'carpenter');
        setData(carpenterServices);
    }, []);

    const filterResult = (catItem) => {
        const result = Data.product.filter((curData) => curData.catagory === catItem);
        setData(result);
    };

    return (
        <div className='container'>
            <div className='row' style={{ width: "100%", marginTop: "-3.2rem" }}>
                <div className='col-12'>
                    {/* Optional: Add any headers or additional UI components here */}
                </div>

                <div className='col-12'>
                    <div className='row' style={{ width: "100%" }}>
                        {data.length > 0 ? (
                            data.map((prod) => (
                                <Card prod={prod} key={prod.id} />
                            ))
                        ) : (
                            <p>No carpenter services available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carpenter;
