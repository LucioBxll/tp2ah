import PropTypes from 'prop-types';
import { useEffect } from 'react';
import M from 'materialize-css';

export const Banner = ({ slides = [{ title: 'Título por defecto', message: '' }] }) => {
  useEffect(() => {
    const elems = document.querySelectorAll('.parallax');
    M.Parallax.init(elems, {
      responsiveThreshold: 0
    });

    return () => {
      const instances = M.Parallax.getInstance(elems);
      if (instances) {
        instances.destroy();
      }
    };
  }, []);

  if (!slides?.length) {
    return null;
  }

  const slide = slides[0];

  return (
    <div className="parallax-container" style={{ height: '600px' }}>
      <div className="parallax">
        <img src={slide.image} alt="Banner" />
      </div>
      <div className="title-container valign-wrapper center-align bg">
        <h2 className="title amber-text accent-4">
          {slide.message.split('\n')[0]}<br/>
          <strong>{slide.message.split('\n')[1]}</strong>
        </h2>
        <div className="linea1"></div>
        <div className="linea2"></div>
      </div>
    </div>
  );
};

Banner.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      message: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};
