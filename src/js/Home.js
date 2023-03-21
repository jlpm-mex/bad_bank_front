import Card from 'react-bootstrap/Card';
import '../css/Home.css'

export const Home = () => {
  return (
    <div className='container'>
        <Card style={{ width: '18rem' }} className='m-auto'>
        <Card.Img variant="top" src={require("../assets/logo.png")}/>
        <Card.Body>
            <Card.Title>Bad Bank</Card.Title>
            <Card.Text>
            Somos el banco de la estafa
            </Card.Text>
        </Card.Body>
        </Card>
    </div>
  );
}