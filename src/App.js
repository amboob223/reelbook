import './App.css';
import Form from "./components/form";
import CarouselFadeExample from "./components/ExampleCarouselImage"
function Home() {
  return (
    <div>
      <nav style={{ display: "flex", backgroundColor: "grey", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ color: "white" }}>ReelBook</h1>
        </div> 
      
      </nav>
    </div>
  );
}




function Main(){
  return(
    <div>
      <h1>Welcome to Reelbook</h1>
      <p>You can book a videographer for cinematography, content marketing, music videos</p>
      <CarouselFadeExample/>
    </div>
  );
}

function App() {
  return (
    <div className="App"> 
      <Home/>
      <header className="App-header">
        <div style={{ display: "flex", marginLeft:"20px" }}>
          <Main/>
          <div  style={{ display: "flex", marginLeft:"20px" }}>
                <Form/>
          </div>
          
        </div>
      </header>
    </div>
  );
}

export default App;
