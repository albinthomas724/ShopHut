import { createContext, useContext, useRef } from "react";

const ScrollContext = createContext();

// eslint-disable-next-line react/prop-types
export const ScrollProvider = ({ children }) => {
  const sectionsRef = useRef({});

  const handleScrollToSection = (categoryId) => {
    const section = sectionsRef.current[categoryId];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ScrollContext.Provider value={{ handleScrollToSection, sectionsRef }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
