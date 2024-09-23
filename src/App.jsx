import { useEffect, useState } from 'react';
import './App.css'
import Noticias from './components/Noticias.jsx'
import SideBottomMenu from './components/SideBottonMenu'

function App() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  const [menuSelected, setMenuSelected] = useState('today')
  const [activeMicroMenu, setActiveMicroMenu] = useState('')
  const [search, setSearch] = useState(false)
  const today = new Date().toLocaleDateString('en-CA')
 
  useEffect(() => {
    const apiKeys = ['818d2977780ccd5c567026b0b3b5488b', '700bb2a56cf1f2ef193b2dc58a4d9912']; // Lista de claves
    let currentKeyIndex = 0; // Índice para la clave actual
  
    const obtenerNoticias = async () => {
      let url = `http://api.mediastack.com/v1/news?access_key=${apiKeys[currentKeyIndex]}&limit=100&languages=en`;
  
      if (menuSelected === 'today') {
        url += `&date=${today}`;
      }
      if (category) {
        url += `&categories=${category}`;
      }
  
      if (menuSelected === 'favorities') {
        let favorites = await JSON.parse(localStorage.getItem('favorites'));
        setNoticias(favorites);
        return;
      }
  
      let successfulFetch = false;
  
      while (!successfulFetch && currentKeyIndex < apiKeys.length) {
        try {
          const respuesta = await fetch(url);
  
          if (!respuesta.ok) {
            throw new Error(`Error en la red: ${respuesta.status}`);
          }
  
          const datos = await respuesta.json();
          setNoticias(datos.data); // Asigna los artículos al estado
          successfulFetch = true; // Marcar como éxito
        } catch (error) {
          console.log(`Fallo con clave: ${apiKeys[currentKeyIndex]}. Probando con otra...`);
          currentKeyIndex++; // Intenta con la siguiente clave en caso de error
  
          if (currentKeyIndex < apiKeys.length) {
            // Actualiza la URL con la nueva clave
            url = `http://api.mediastack.com/v1/news?access_key=${apiKeys[currentKeyIndex]}&limit=100&languages=en`;
            if (menuSelected === 'today') {
              url += `&date=${today}`;
            }
            if (category) {
              url += `&categories=${category}`;
            }
          } else {
            setError('Todas las claves de API fallaron.');
            break;
          }
        } finally {
          setCargando(false); // Cambia el estado de carga
        }
      }
    };
  
    obtenerNoticias();
  }, [category, menuSelected, activeMicroMenu, search]); // Ahora escucha cambios en 'category' y 'menuSelected'
  
  const handleCategorySelection = (cat) => {
    setCategory(cat); // Actualiza correctamente la categoría
  };

  const handleMenuSelected = (menuOpt) => {
    setActiveMicroMenu('')
    setCategory('')
    setMenuSelected(menuOpt)
    if(menuSelected === 'favorities') {
      let favorites = JSON.parse(localStorage.getItem('favorites'))
      setNoticias(favorites)
      return;
    }
  }

  const handleMicroMenu = (index) => {
    if(activeMicroMenu === index) {
      setActiveMicroMenu('')
    }else {
      setActiveMicroMenu(index)
    }
  }

  const handleAddFavorites = (news) => {
    let oldFavorites = []
    let favorites;
    const validOld = JSON.parse(localStorage.getItem('favorites'))
    if(validOld) {
      oldFavorites = [...validOld]
      favorites = [...oldFavorites, news]
      localStorage.setItem('favorites', JSON.stringify(favorites))
      setActiveMicroMenu('')
    }else {
      favorites = [news]
      localStorage.setItem('favorites', JSON.stringify(favorites))
      setActiveMicroMenu('')
    }
  }

  
  const handleRemoveFavorite = (newsToRemove)=> {
    let news = JSON.parse(localStorage.getItem('favorites'))
    const filteredNews = news.filter(noticia => noticia.url !== newsToRemove.url)
    localStorage.setItem('favorites', JSON.stringify(filteredNews))
    setActiveMicroMenu('')
  }

  const handleSearchAction = (textoToSearch) =>{
    if(textoToSearch === '') {
      setSearch(!search)
    }else {
      const text = textoToSearch.toLowerCase();
      const noticiasSearched = noticias.filter( objeto => objeto.title.toLowerCase().includes(text) || objeto.description.toLowerCase().includes(text))
      setNoticias(noticiasSearched)
    }
  }
  
  if (cargando) {
    return (
      <div className='w-full h-[100vh] bg-slate-400'>
        <div className='loader w-[5rem] m-auto'></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  let content = <Noticias 
                  noticiaArray={noticias} 
                  onCatSelected={handleCategorySelection} 
                  menuSelected={menuSelected} 
                  activeMicroMenu={handleMicroMenu} 
                  microMenu={activeMicroMenu}
                  addFavorite={handleAddFavorites}
                  removeFavorite={handleRemoveFavorite}
                  category={category}
                />;

  return (
    <>
      <div className='flex'>
        <SideBottomMenu onMenuSelect={handleMenuSelected} menuSelected={menuSelected} searchAction={handleSearchAction}/>
        {content}
      </div>
    </>
  );
}

export default App;
