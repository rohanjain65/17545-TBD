// context/HWSetContext.js
import React, { createContext, useContext, useState } from 'react';

const HWSetContext = createContext();

export const HWSetProvider = ({ children }) => {
  const [hwSets, setHWSets] = useState({
    HWSet1: { total: 100, available: 100, checkedOutByProject: {} },
    HWSet2: { total: 100, available: 100, checkedOutByProject: {} }
  });

  const updateHWSet = (hwsetName, operation, quantity, projectName) => {
    setHWSets(prev => {
      const hwSet = prev[hwsetName];
      const currentCheckedOut = hwSet.checkedOutByProject[projectName] || 0;
      let newCheckedOut = currentCheckedOut;
      let newAvailable = hwSet.available;

      if (operation === 'checkout') {
        if (quantity <= hwSet.available) {
          newAvailable = hwSet.available - quantity;
          newCheckedOut = currentCheckedOut + quantity;
        }
      } else if (operation === 'checkin') {
        if (quantity <= currentCheckedOut) {
          newAvailable = hwSet.available + quantity;
          newCheckedOut = currentCheckedOut - quantity;
        }
      }

      return {
        ...prev,
        [hwsetName]: {
          ...hwSet,
          available: newAvailable,
          checkedOutByProject: {
            ...hwSet.checkedOutByProject,
            [projectName]: newCheckedOut
          }
        }
      };
    });
  };

  return (
    <HWSetContext.Provider value={{ hwSets, updateHWSet }}>
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