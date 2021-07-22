import React,{useState} from 'react';

export default function Header() {
    const [searchText, setSearchText] = useState('');
    const [images, setImages] = useState([]);

    const handleInputChange = (event) =>{
        console.log(event.target.value)
        // console.log(searchText)
        setSearchText(event.target.value)
        if(event.target.value === ""){
            setImages([])
        }
        else{
            fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2511739074e8bebd4e4e9a945b4c9382&text=${event.target.value}&format=json&nojsoncallback=1`)
            .then(res => res.json())
            .then(result =>{
                if(result.photos){
                    console.log(typeof(images))
                    setImages(result.photos.photo)
                    console.log(result.photos.photo)
                }
            })
        }
    }
    return (
        <>
        <header style={{marginBottom:"80px"}}>
            <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-dark">
            <div className="container-fluid d-flex justify-content-center">
                {/* <h1 className="bg-light">Search Images</h1> */}
                <form className="d-flex">
                    <input className="form-control" type="search" value={searchText} onChange={(e) => handleInputChange(e)} placeholder="Search" aria-label="Search" />
                </form>
            </div>
            </nav>
        </header>
        {
            images.length > 0 ?
            <div className="d-flex flex-wrap">
                {
                images.map((item) =>{
                    return(
                        <div key={item.id} className="p-2 col-12 col-md-4">
                            <img className="img-fluid" src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`} key={item.id} alt={item.title} />
                            <figcaption>{item.title}</figcaption>
                        </div>
                    )
                }) 
                }
            </div>
            : null 
        }
        </>
    )
}
