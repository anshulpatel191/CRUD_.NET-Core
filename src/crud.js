import React ,{useState,useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const CRUD = ()=>{

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [name,setName] = useState('');
    const [age,setAge] = useState('');
    const [isActive,setisActive] = useState('');


    const [editiId, seteditId] = useState('');
    const [editName,seteditName] = useState('');
    const [editAge,seteditAge] = useState('');
    const [editIsActive,seteditisActive] = useState('');

    const empdata = [

        {
            id : 1,
            name : 'Manoj',
            age : 29,
            isActive : 1
        },
        {
            id : 2,
            name : 'Virat',
            age : 23,
            isActive : 1
        },
        {
            id : 3,
            name : 'gayle',
            age : 49,
            isActive : 0
        }
    ]
    
    const [data, setData] = useState([]);

    useEffect(() =>{
        getData();
    },[])


    const getData = () =>{
        axios.get('https://localhost:7004/api/Employee')
        .then((result) =>{
        setData(result.data)
        })
        .catch((error) => {
        console.log(error)
        })
        }

    const handleEdit = (id) =>{
        //alert(id);
        handleShow();
    }

    const handleDelete = (id) =>{
        if(window.confirm("Pakka delete krna hein?") == true)
        {alert(id);}
        
    }

    const handleUpdate = ()=>{

    }

    const handleSave = () => {
        const url = 'https://localhost:7004/api/Employee';
        const data = {
        "name": name,
        "age": age,
        "isActive": isActive
        }
        axios.post(url, data)
        .then((result) =>{
        getData();
        clear();
        toast.success('Addded');
        })
        }
        
        const clear = () =>{
        setName(' ');
        setAge('');
        setisActive(0);
        seteditName(' ');
        seteditAge('');
        seteditisActive('');
        seteditId('');
        
        }

        const handleActiveChange =(e)=>{
                    if(e.target.checked){
                        setisActive(1);
                    }
                    else{
                        setisActive(0);
                    }
        }

        const handleEditActiveChange =(e)=>{
            if(e.target.checked){
                seteditisActive(1);
            }
            else{
                seteditisActive(0);
            }
}

    return(
        <Fragment>
            <ToastContainer/>
            <Container>
     <Row>
       <Col>
       <input type="text" className="form-control" placeholder="Enter name"
       value={name} onChange={(e) => setName(e.target.value)}/>
       </Col>
       <Col><input type="text" className="form-control" placeholder="Enter Age"
       value={age} onChange={(e) => setAge(e.target.value)}/></Col>
       <Col><input type="checkbox" 
       checked={isActive === 1 ? true : false}
       onChange={(e) => handleActiveChange(e)} value ={isActive}
       />
       <label>IsActive</label>
       </Col>
       <Col>
       <button className="btn btn-primary" onClick={()=>handleSave()}>Submit</button>
       </Col>
     </Row>
   </Container>
            <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>id</th>
          <th>Name</th>
          <th>Age</th>
          <th>isActive</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
            data && data.length > 0 ?
                data.map((item, index) => {
                    return(
                        <tr  key ={index}>
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.isActive}</td>
                            <td colSpan={2}>
                                <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                                <button className="btn btn-danger" onClick={()=> handleDelete(item.id)}>Delete</button>

                            </td>
                        </tr>
                    )
                }
                )
                :
                'Loading....'
        }
        
     
      </tbody>
    </Table>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
       
     <Row>
     <Col>
       <input type="text" className="form-control" placeholder="Enter name"
       value={editName} onChange={(e) => seteditName(e.target.value)}/>
       </Col>
       <Col><input type="text" className="form-control" placeholder="Enter Age"
       value={editAge} onChange={(e) => seteditAge(e.target.value)}/></Col>
       <Col><input type="checkbox" 
       checked={editIsActive === 1 ? true : false}
       onChange={(e) => handleEditActiveChange(e)} value ={editIsActive}
       />
        </Col>
     </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer> 
      </Modal>
        </Fragment>
    )
}

export default CRUD;