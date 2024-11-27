import davinciLogo from '../assets/davinci.png';

export function Footer() {
    return (
      <footer className="page-footer amber accent-4 white-text">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Información</h5>
              <p className="grey-text text-lighten-4">
                <span style={{ color: '#1a1a1a', fontWeight: 'bold' }}>Alumnos:</span> German Martini - Lucio Boxall
              </p>
              <p className="grey-text text-lighten-4">
                <span style={{ color: '#1a1a1a', fontWeight: 'bold' }}>Docente:</span> Camila Marcos Galbán
              </p>
              <p className="grey-text text-lighten-4">
                <span style={{ color: '#1a1a1a', fontWeight: 'bold' }}>Comisión:</span> DWN4AV
              </p>
            </div>
            <div className="col l4 offset-l2 s12">
              <a href="https://davinci.edu.ar/" target="_blank" rel="noopener noreferrer">
                <img src={davinciLogo} alt="Logo DaVinci" className="responsive-img" />
              </a>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container valign-wrapper white-text">
              © 2024 German Martini - Lucio Boxall
            </div>
          </div>
        </div>
      </footer>
    );
  }