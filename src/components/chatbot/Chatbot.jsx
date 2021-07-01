
import React, {Fragment, useState} from "react";
import{Form, InputGroup, Button} from "react-bootstrap";

function Chatbot() {

  const [text, setText] = useState("");
  const [respuesta, setRespuesta] = useState("");


  const chat = async(text) => {
    console.log(text);
    console.log("Procesando Respuesta");
    const datos = await fetch(`https://lucasia.herokuapp.com/dialogo/${text}`);
    var resp = await datos.json();
    setRespuesta(resp);
    console.log("Respuesta Enviada");
    return respuesta;        
    }



  const handleSubmit = (event) => {

    event.preventDefault()
    chat(text)
    setText('')     

  }
  const handleEnter = (event) => {
    if (event.key === "Enter"){
    event.preventDefault()
    chat(text)
    setText('')      
    }  
  }

  return(
    <Fragment>

 
      <div className = "container-sm border border-dark border-3 rounded-3 bg-success p-3">
        <h1>Chatbot Lucasia</h1>
        <div className = "d-flex flex-column flex-grow-1">
        <Form onSubmit={handleSubmit}>
          <Form.Group className = "m-2">
            <InputGroup>
              <Form.Control
                as = "textarea"
                
                required
                value= {text}
                onChange= {event => setText (event.target.value)}
                style ={{height:"100px", resize: "none"}}
                onKeyDown = {handleEnter}
                />
              <InputGroup.Append>
                <Button type= "submit" className = "btn btn-dark" style ={{height:"100px", width:"100px"}}>Enviar </Button>
              </InputGroup.Append>                        
            </InputGroup>
          </Form.Group>
        </Form>
        </div>
        <h3>Respuesta:</h3>
        <div className = "container-sm border rounded-3 bg-light media">
            <p>{respuesta}</p>        
        </div>        
      </div>

    </Fragment>  
    );
}

export default Chatbot;