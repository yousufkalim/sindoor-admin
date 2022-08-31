import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import { Modal, ModalBody, img, ModalHeader, ModalFooter, Button, FormGroup, Form, Input, Row, Col, Label } from 'reactstrap';
// core components
import Select from 'react-select';

const { Option } = Select;

const AddPicture = ({ openModal, handleModal, getPictures }) => {
  let [picture, setPicture] = useState({
    active: false,
  });

  const [eventimage, setEventImage] = useState('');
  const [codeimage, setCodeImage] = useState('');

  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (!file.type.includes('image')) {
      toast.error('Only image can be selected');
      return;
    }
    if (event.target.files && event.target.files[0] && event.target.name === 'eventImage') {
      setPicture({ ...picture, eventImage: event.target.files[0] });
      setEventImage(URL.createObjectURL(event.target.files[0]));
    } else if (event.target.files && event.target.files[0] && event.target.name === 'codeImage') {
      setPicture({ ...picture, codeImage: event.target.files[0] });
      setCodeImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const options = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];

  const handleSubmit = (e) => {
    if (eventimage === '' || codeimage === '') {
      return toast.error('All fields  are required');
    }
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('eventImage', picture.eventImage);
    formdata.append('codeImage', picture.codeImage);
    formdata.append('active', picture.active);

    api('post', '/appPicture/', formdata).then((res) => {
      toast.success('Picture added successfully');
      getPictures();
      handleModal();
    });
  };

  const handleActiveChange = (e) => {
    setPicture(() => ({
      ...picture,
      active: e.value,
    }));
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Upcoming Event Background Pictures
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          <span style={{ color: 'red' }}>{eventimage ? '' : '*'} </span>
                          Upload image 1
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          type="file"
                          name="eventImage"
                          accept="image/png, image/jpeg"
                          onChange={onImageChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <img src={eventimage} alt="preview image" style={{ height: '100px', width: '50x' }} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">
                          <span style={{ color: 'red' }}>{codeimage ? '' : '*'} </span>
                          Upload image 2
                        </label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          type="file"
                          name="codeImage"
                          accept="image/png, image/jpeg"
                          onChange={onImageChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <img src={codeimage} alt="preview image" style={{ height: '100px', width: '50x' }} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className="form-control-label">Status</label>
                        <Select
                          onChange={handleActiveChange}
                          name="active"
                          className="form-control-alternative"
                          defaultValue={{ label: 'No', value: false }}
                          options={options}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddPicture;
