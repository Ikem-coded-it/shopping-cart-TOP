import "./styles.css"

export default function Admin () {
  return (
    <>
      <form className="ball-upload-form">
        <div 
          className="title-container">
            <input className="ball-upload-input" placeholder="title" />
        </div>
        <div 
          className="description-container">
            <textarea placeholder="description"></textarea>
        </div>
        <div 
          className="price-container">
            <input className="ball-upload-input" type="number" placeholder="0" />
        </div>
        <div 
          className="image-container">
            <input className="ball-upload-input" type="file" />
        </div>
        <div
          className="upload-btn-container">
          <button className="upload-btn">Upload</button>
        </div>
      </form>
    </>
  )
}