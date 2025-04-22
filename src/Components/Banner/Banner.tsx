import { useState, useEffect } from "react";
import "./BannerStyle.css";

interface BannerProps {
  prevImg: string;
  url: string;
}

interface BannerComponentProps {
  images: BannerProps[];
}

const Banner: React.FC<BannerComponentProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(intervalId);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <section className="section-banner">
      {images.map((img, index) => (
        <img
          key={index}
          src={img.url}
          alt={`Banner ${index}`}
          className={`banner-img ${index === currentIndex ? "active" : ""}`}
        />
      ))}
    </section>
  );
};

export default Banner;
