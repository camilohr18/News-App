const CategorySelector = ({onCatSelected, onMenuSelected, category}) => {

    const categories = ['general', 'business', 'entertainment', 'health','science','sports','technology']
    let classesToShow = "grid grid-cols-7 gap-2 toAnimate"
    if(onMenuSelected === 'categories') {
        classesToShow+= " animationCategories"
    }
    return(
        <div className={classesToShow}>
            {categories.map((cat) => {
                return(
                    <div className="mb-4" key={cat}>
                        <button className={`text-gray-100 hover:bg-yellow-500 py-1 rounded-xl w-full capitalize lg:py-4 ${category === cat ? 'bg-yellow-500' : 'bg-blue-500'}`} onClick={() => onCatSelected(cat)}>{cat}</button>
                    </div>
                )
            })}
        </div>
    )
}

export default CategorySelector;