import PropTypes from 'prop-types';
export function Banner({ slides }) {
  const slide = slides[0];

  return (
    <div style={{ maxWidth: '90vw', overflow: 'hidden', position: 'relative', height: '70vh' }}>
      <div className={`banner banner-${slide.type}`} style={{ position: 'relative', overflow: 'hidden', height: '100%', width: '100vw' }}>
        {slide.image && <img src={slide.image} alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontWeight: 'bold' }}>
          {slide.message}
        </p>
      </div>
    </div>
  );
}

Banner.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};
