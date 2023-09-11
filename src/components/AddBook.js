import React ,{useState} from "react";
import axios from "axios";
import {Button, Card, CardBody,CardFooter, Col,Container,Form,Input,InputGroup, Row} from 'reactstrap';

function AddBook(props){

    const[book,setBook] = useState({Name:'',Author:''});
    const apiURL = '';

    const AddNewBook = (e)=>{
        e.preventDefault();
        const data = {Name:book.Name, Author:book.Author};
        axios.post(apiURL,data)
        .then((result) =>{
            props.history.push('/BookList')
        });
    }

    const onChange = (e)=>{
        e.persist();
        setBook({...book,[e.target.name] : e.target.value});
    }

    return(
        <div className=" app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md='12' lg='10' xl='8'>
                        <Card className="mx-4">
                            <CardBody className="p-4">
                                <Form  onSubmit={AddNewBook}>
                                    <h1>Add New Book</h1>
                                    <InputGroup className="mb-3">
                                        <Input type="text" name="Name" id="Name"   placeholder="Name" value={book.Name} onChange={onChange}></Input>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <Input type="text" name="Author" id="Author"   placeholder="Author" value={book.Author} onChange={onChange}></Input>
                                    </InputGroup>
                                    <CardFooter className="p-4">
                                        <Row >
                                            <Col xs='12' sm='6'>
                                                <Button type="submit" className="btn btn-info mb-1" block><span>Save</span></Button>
                                            </Col>
                                            <Col xs='12' sm='6'>
                                                <Button className="btn btn-info mb-1" block><span>Cancel</span></Button>
                                            </Col>
                                        </Row>

                                    </CardFooter>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddBook;