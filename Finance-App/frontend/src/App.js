import React, {useState} from 'react'
import styled from "styled-components";
import bg from './img/bg.png'
import {MainLayout} from './styles/Layout'
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income'
import Expenses from './Components/Expenses/Expenses'
import { useGlobalContext } from './context/globalContext';



function App() {
  const [active, setActive] = React.useState(1); // State to manage the active tab

  const global = useGlobalContext(); // Custom hook to access global context data
  console.log(global);

  // Function to determine which component to display based on the active tab
  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  }

  return (
    // Main App container with background image
    <AppStyled bg={bg} className="App">
      <MainLayout>
        {/* Navigation component to switch between tabs */}
        <Navigation active={active} setActive={setActive} />
        <main>
          {/* Display the selected component based on the active tab */}
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  );
}

// Styled component for the main App container
const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    
    overflow-x: hidden;
    padding-top: 20px; 
    padding-left: 20px; 
    padding-right: 20px; 
   
    
    
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;
export default App;
