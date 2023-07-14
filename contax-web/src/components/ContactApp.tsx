import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, ListGroup, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

type Contact = {
       id: number;
       firstName: string;
       lastName: string;
}

const ContactApp = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [currentActive, setCurrentActive] = useState(-1);
  const [currentEditing, setCurrentEditing] = useState(-1);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5042/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addContact = async () => {
    try {
      const response = await axios.post('http://localhost:5042/contacts', {
        firstName,
        lastName
      });
      setContacts([...contacts, response.data]); //Spread operator is a new one for me - what an interesting op.
      setFirstName('');
      setLastName('');
    } catch (error) {
      console.error(error);
    }
  };

  const removeContact = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5042/contacts?id=${id}`);
      setContacts(contacts.filter(contact => contact.id !== id)); //No need to touch the API to get updated list
    } catch (error) {
      console.error(error);
    }
  };

  const updateContact = async (updatedContact: Contact) => {

    try {
      await axios.put(`http://localhost:5042/contacts`, updatedContact);
      setContacts(contacts.map(contact => (contact.id === updatedContact.id ? updatedContact : contact))); //Again, no need to touch the API to get the updated list.
        setCurrentEditing(-1);  
    } catch (error) {
      console.error(error);
    }

  };

  return (
      <>
        <h2>Contacts</h2>
        <ListGroup>
              {contacts.map(contact => (
                  <ListGroup.Item className="d-flex justify-content-between align-items-start" onMouseEnter={() => setCurrentActive(contact.id) } onMouseLeave={() => currentActive === contact.id && setCurrentActive(-1) }>
                      {contact.id === currentEditing ?
                             <Form>
                                  <Form.Group as={Row}>
                                  <Col>
                                        <Form.Control size="sm" type="text" defaultValue={contact.firstName} onChange={e => contact.firstName = e.target.value}/>
                                    </Col>
                                    <Col>
                                      <Form.Control size="sm" type="text" defaultValue={contact.lastName} onChange={e => contact.lastName = e.target.value} />
                                      </Col>
                                  </Form.Group>
                            </Form>
                           :
                             <div>{contact.firstName} {contact.lastName}</div>
                      }      
                        {contact.id === currentActive && 
                          <div>
                              {contact.id === currentEditing ?
                                <i style={{cursor:"pointer"}} onClick={() => updateContact(contact)}><FontAwesomeIcon color="black" icon={faFloppyDisk}/></i>
                                :
                                <>
                                    <i style={{cursor:"pointer"}} onClick={() => setCurrentEditing(contact.id)}><FontAwesomeIcon color="black" icon={faPenToSquare}/></i>
                                    <i style={{cursor:"pointer"}} onClick={() => removeContact(contact.id)}><FontAwesomeIcon color="black" icon={faTrash}/></i>
                                </>
                                }  
                          </div>
                          
                        }
                  </ListGroup.Item>
              )) }
              <ListGroup.Item  className="d-flex justify-content-between align-items-start" >
                <div>
                    <Form>
                          <Form.Group as={Row}>
                          <Col>
                              <Form.Control size="sm" type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                            </Col>
                            <Col>
                              <Form.Control size="sm" type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                              </Col>
                          </Form.Group>
                    </Form>
                </div>
                    <i style={{cursor:"pointer"}} onClick={() => addContact()}><FontAwesomeIcon color="black" icon={faPlus}/></i>            
              </ListGroup.Item>
        </ListGroup>
      </>
  );
};

export default ContactApp;