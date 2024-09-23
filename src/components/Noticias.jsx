import CategorySelector from "./CategorySelector"

const Noticias = ({noticiaArray, onCatSelected, menuSelected, activeMicroMenu, microMenu, addFavorite, removeFavorite, category}) => {

    const truncateString = (str) =>  {
            if(str) {
                if(str.length > 85) {
                    return str.substring(0, 85) + "..."
                }else{
                    return str
                };
            }
    }

    return (
        <div className='w-full p-8'>
            <CategorySelector onCatSelected={onCatSelected} onMenuSelected={menuSelected} category={category}/>
            <div className='lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 grid gap-8'>
                {noticiaArray.map((noticia, index) => {
                    return(
                    <div className='p-0 shadow-md rounded-xl' key={index}>
                        <div className="min-h-[390px]">
                            <div className='h-[15rem] rounded-t-xl' 
                            style={{
                                backgroundImage: noticia.image ? 'url('+noticia.image+')' : 'url(../logo-noticias.png)', 
                                backgroundSize: noticia.image ? 'cover':'82px', 
                                backgroundPosition: 'center', 
                                backgroundRepeat: noticia.image ? 'no-repeat': 'repeat',
                                opacity: noticia.image ? '1':'0.5',
                                backgroundColor: '#37474F'
                            }}>

                            </div>
                            <div className="flex static">
                                <a href={noticia.url} target="_blank" rel="noopener noreferrer" className="w-11/12">
                                    <h2 className='ps-4 text-[16px] mt-4 font-bold leading-5 text-blue-500 hover:text-yellow-500 mb-2'>{noticia.title}</h2></a>
                                <button className="w-1/12 pe-4" onClick={()=> activeMicroMenu(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-yellow-500">
                                    <path d="M10 3.75a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM17.25 4.5a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM5 3.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM4.25 17a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM17.25 17a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM9 10a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1 0-1.5h5.5A.75.75 0 0 1 9 10ZM17.25 10.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM14 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM10 16.25a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                                </svg>
                                </button>
                            </div>
                            <p className='px-4 text-[13px] mb-4'>{truncateString(noticia.description)}</p>
                        </div>
                        <div className={`w-full rounded-b-xl microMenu p-0 ${microMenu === index ? 'h-[40px]' : 'h-[0px]'}`}>
                            <ul className="flex gap-4 justify-evenly">
                                {menuSelected === 'categories' || menuSelected === 'today' ? (
                                    <li className="w-full">
                                        <button className="w-full p-2 bg-yellow-500" onClick={() =>addFavorite(noticia)} > Add Favorites </button>
                                    </li>
                                ) : (
                                    <button onClick={()=>removeFavorite(noticia)}>
                                        <li>Remove Favorites</li>
                                    </button>
                                )}
                            </ul>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Noticias;
