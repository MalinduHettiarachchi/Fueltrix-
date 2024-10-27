import React, { createContext, useState } from 'react';

export const ManagerContext = createContext();

export const ManagerProvider = ({ children }) => {
  const [managerDetails, setManagerDetails] = useState(null);

  // Here, you should set the manager details, for example:
  // useEffect(() => {
  //   // Fetch or set your manager details here
  //   setManagerDetails({ company: "Fueltrix Inc." });
  // }, []);

  return (
    <ManagerContext.Provider value={{ managerDetails, setManagerDetails }}>
      {children}
    </ManagerContext.Provider>
  );
};
