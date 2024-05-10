import { useState, useEffect } from 'react'
// import './App.css'
import Swap from "src/components/Swap";
import Pool from "src/components/Pool";
import List from "src/components/List";

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayComponent, setDisplayComponent] = useState<any>(null)

  useEffect(() => {
    if (selectedIndex === 0) {
      setDisplayComponent(<Swap />);
    }
    else if (selectedIndex === 1) {
      setDisplayComponent(<Pool />);
    }
  }, [selectedIndex])

  return (
    <div
      className="row m-0 p-0"
      style={{
        backgroundColor: "rgba(255,255,255,0.70)",
        borderRadius: "20px",
        minHeight: "600px",
      }}>
      <div
        className="col-2 px-3 py-5"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
        }}>
        {/* menu */}
        <div className="text-center mb-5">
          <h4>Swap pools</h4>
        </div>
        <hr />
        <List
          name="Swap"
          active={selectedIndex === 0}
          onClick={() => setSelectedIndex(0)} />
        <List
          name="Pools"
          active={selectedIndex === 1}
          onClick={() => setSelectedIndex(1)} />
      </div>
      {/* <h5 className="pb-5">Liquidity pools</h5> */}

      <div className="col-10 p-5">
        {
          selectedIndex == 0 ?
            <h5 className="pb-5">Swap</h5>
            :
            <h5 className="pb-5">Liquidity pools</h5>
        }
        {
          displayComponent
        }
      </div>
    </div>
  )
}

export default App
