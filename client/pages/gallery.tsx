import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";


const Gallery = () => {

  const images = [
    {
      original: "/imgs/projects/hunter/hunter-1.png",
      thumbnail: "/imgs/projects/hunter/hunter-1.png",
    },
    {
      original: "/imgs/projects/hunter/hunter-2.png",
      thumbnail: "/imgs/projects/hunter/hunter-2.png",
    },
    {
      original: "/imgs/projects/hunter/hunter-3.png",
      thumbnail: "/imgs/projects/hunter/hunter-3.png",
    },
  ];
  return (
    <>
      <ImageGallery
        slideDuration={180}
        showFullscreenButton={false}
        showNav={false}
        showPlayButton={false}
        items={images}
      />
    </>
  )
}

export default Gallery