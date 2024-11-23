import { Banner } from '../components/banner.jsx';
import image1 from '../assets/fondito.jpg';

export function Inicio() {
  const slides = [
    {
      message: "Bienvenido a nuestra aplicación",
      type: "info",
      image: image1
    }
  ];

  return (
    <div>
      <Banner slides={slides} />
    </div>
  );
}
