import {useEffect, useState} from 'react';
import { useParams, useNavigate,} from 'react-router-dom';
import api from '../../services/api';
import'./filmeinfo.css'
import {toast} from 'react-toastify'

function Filme(){
    const{id}= useParams();
    const navigate = useNavigate();
    const[filme,setFilme]= useState({});
    const[loading,setLoading]= useState(true);
    useEffect(()=>{
        async function loadFilme(){
        await api.get(`/movie/${id}`,{
            params:{
                api_key: "99b0972e25c630604ec2bb107b22bbcb",
                language: "pt-BR",
                // page: 1,
            }
        })
        .then((response)=>{
            setFilme(response.data);
            setLoading(false);
        })
        .catch(()=>{
            navigate ("/",{replace: true});
            return;
        })
        }
        loadFilme();

        return() =>{

        }
    },[navigate,id])

    function salvarFilme(){
        const minhaLista= localStorage.getItem("@primeflix");
        let filmeSalvo = JSON.parse(minhaLista)||[];
        const hasfilme = filmeSalvo.some((filmeSalvo)=> filmeSalvo.id ===filme.id )
        if(hasfilme){
            toast.warn("Esse filme ja está na sua lista");
            return
        }
        filmeSalvo.push(filme);
        localStorage.setItem("@primeflix",JSON.stringify(filmeSalvo));
        toast.success("Filme salvo com sucesso");
    }
    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes</h1>
            </div>
        )
    }
    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`http://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}></img>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} /10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title}`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}
export default Filme;