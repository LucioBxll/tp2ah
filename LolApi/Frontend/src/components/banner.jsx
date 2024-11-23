import PropTypes from 'prop-types';
import { useEffect } from 'react';
import M from 'materialize-css';

export const Banner = ({ slides }) => {
  const slide = slides[0];

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

  return (
    <div className="parallax-container" style={{ height: '400px' }}>
      <div className="parallax">
        <img src={slide.image} alt="Banner" />
      </div>
      <div className="container center-align" style={{ 
        paddingTop: '100px',
        background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h2 className="amber-text accent-4" style={{ 
          fontSize: '3rem',
          lineHeight: '1',
          textShadow: '1px 1px 1px rgba(0,0,0,0.432)'
        }}>
          Bienvenido a
          <strong style={{ 
            display: 'block',
            fontSize: '5rem',
            fontStyle: 'italic',
            fontWeight: '900'
          }}>
            LEAGUE OF LEGENDS
          </strong>
        </h2>
        <div style={{ 
          width: '150px',
          height: '3px',
          margin: '10px 0',
          backgroundColor: 'rgba(223, 192, 17, 0.986)'
        }}></div>
        <div style={{ 
          width: '75px',
          height: '3px',
          margin: '5px 0',
          backgroundColor: 'rgba(223, 192, 17, 0.986)'
        }}></div>
      </div>
    </div>
  );
};

Banner.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};
