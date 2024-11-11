// context/HWSetContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const HWSetContext = createContext();

export const HWSetProvider = ({ children }) => {

  const [availableQty1, setAvailableQty1] = useState(100);
  const [availableQty2, setAvailableQty2] = useState(100);

  // Call /hardware API to get hardware set data
  const getHWSetData = async (hwsetName) => {
    try {
      const response = await fetch("http://localhost:5000/hardware", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hwsetName }),
      });
      const data = await response.json();
      return data;
    }
    catch (error) {
      console.log("Error getting hardware set data");
    }
  };

  // Update HWSet1 and HWSet2 data
  const updateHWSetData = async () => {
    const hwSet1Data = await getHWSetData('HWSet1');
    const hwSet2Data = await getHWSetData('HWSet2');

    setAvailableQty1(hwSet1Data.hwset.availableQuantity);
    setAvailableQty2(hwSet2Data.hwset.availableQuantity);
  };

  // Init HWSet1 and HWSet2 data on component mount
  useEffect(() => {
    updateHWSetData();
  }, []);

  return (
    <HWSetContext.Provider value={{ availableQty1, availableQty2, updateHWSetData }}>
      {children}
    </HWSetContext.Provider>
  );
};

export const useHWSets = () => {
  const context = useContext(HWSetContext);
  if (!context) {
    throw new Error('useHWSets must be used within a HWSetProvider');
  }
  return context;
};