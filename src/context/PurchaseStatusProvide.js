import { useState, createContext, useContext } from "react";

const PurchaseStatusContext = createContext();

export function PurchaseStatusProvider({ children }) {
  const [purchaseInProgress, setPurchaseInProgress] = useState(false);

  return (
    <PurchaseStatusContext.Provider
      value={{ purchaseInProgress, setPurchaseInProgress }}
    >
      {children}
    </PurchaseStatusContext.Provider>
  );
}

export function usePurchaseStatus() {
  return useContext(PurchaseStatusContext);
}
