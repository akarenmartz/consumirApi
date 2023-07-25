import React,{ useState} from 'react';
import axios from 'axios';
//Components
import Navbar from "./components/Navbar";

function App() {
  const [movies, setListaMovies]=useState([]);
  const [mostrar,setMostrar]=useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nombre = e.target.elements.nombre.value;
        if(nombre=== ''){
            alert("Llena todos los campos");
        }else{
            const url = 'https://movie-database-alternative.p.rapidapi.com/?s='+nombre+'&r=json&page=1';
            const obtenerMovies = async () => {
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'cdb4a96ef0mshbf1dd3838c9df27p170b34jsn293b2cfb02db',
                        'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
                    }
                };
                const result = await axios.get(url,options)
                setListaMovies(result.data)
                const resulF = (result.data)
                console.log(resulF);
                if (resulF.Response === "True"){
                    const listaMovie = resulF.Search;
                    setListaMovies(listaMovie)
                    setMostrar(true);
                }else{
                    setMostrar(false)
                }
            }
            obtenerMovies();
        }
    }

  return (
    <>
    <Navbar/>
        <div>
                <form onSubmit={handleSubmit}>
                    <div class="input-group mb-3" style={{padding:"20px"}}>
                    <input type="text" name="nombre" id="nombre" class="form-control" placeholder="Ingresa el nombre de la movie" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <div class="input-group-append" style={{padding:"8px"}}>
                            <button  type='submit' className="btn btn-primary" >Buscar</button>
                        </div>
                    </div>
                </form>
        </div>
        {mostrar ? 
        <div className="container">
            <div className="row">
                {movies.map((item, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
                    <div className="card" style={{ minWidth: "200px" }}>
                    <img className="card-img-top" src={item.Poster} alt="movies" />
                    <div className="card-body">
                        <h5 className="card-title">{item.Title}</h5>
                        <hr />
                        <p className="card-text">Año: {item.Year}</p>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        :
        <div className='container' style={{padding: "140px", marginLeft:"420px"}}>
            <h3>No hay resultados</h3>
        </div> }
    </>
  );
}
export default App;
