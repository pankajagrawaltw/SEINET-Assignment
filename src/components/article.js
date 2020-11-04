import React from 'react';
import Card from 'react-bootstrap/Card';


function Article(props) {
    
    return (
        <div className="col-md-4">
            <Card>
                <div className="card-imghover">
                    <div className="car-img">
                    <div className="overlay"></div>
                        <Card.Img variant="top" src={props.imgUrl} />
                    <span>Fiction</span>
                    <div className="card-imagebtn">
                        <a href={props.buyLink} className="btn btn-primary">Buy</a>
                    </div>
                    </div>
                </div>
                <Card.Body className="text-center">
                <Card.Title>{props.title}</Card.Title>
                <Card.Text className="card-text">
                    Rank - {props.rank}  
                </Card.Text>
                <Card.Text className="card-text">
                    Rank Last Week - {props.rank_last_week}
                </Card.Text>
                <Card.Text className="card-text">
                    Author - {props.author}
                </Card.Text>
                </Card.Body>
                <Card.Footer className="text-right">
                    <a href="#">
                        <i className="far fa-heart"></i>
                    </a>
                </Card.Footer>
            </Card>
      </div>
    );
  }

export default Article;
 