import React from 'react';
import { Container,Button,Row,Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram,} from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
  return (
    
    <Container fluid className="bg-dark text-light text-center py-3">
 <Container fluid className="bg-dark text-light text-center py-3">
      <Row className="justify-content-center">
        <Col xs="auto">
          <Button variant="outline-light" className="m-1">
            <FontAwesomeIcon icon={faFacebookF} />
          </Button>
          <Button variant="outline-light" className="m-1">
            <FontAwesomeIcon icon={faTwitter} />
          </Button>
          <Button variant="outline-light" className="m-1">
            <FontAwesomeIcon icon={faGoogle} />
          </Button>
          <Button variant="outline-light" className="m-1">
            <FontAwesomeIcon icon={faInstagram} />
          </Button>
        
        </Col>
      </Row>
      <p className="mt-3">&copy; 2025 MovieApp. All Rights Reserved.</p>
    </Container>

   
    </Container>
  );
};

export default Footer;
