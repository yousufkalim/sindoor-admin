import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, FormGroup, Form, Input, Row, Col } from 'reactstrap';
// core components
import Select from 'react-select';
const { Option } = Select;

const EditPicture = ({
  openModal,
  handleModal,
  picture,
  setcodeImage,
  seteventImage,
  setPicture,
  getPictures,
  codeimage,
  eventimage,
}) => {
  const handleSubmit = (e) => {
    if (eventimage === '' || codeimage === '') {
      return toast.error('All fields  are required');
    }
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('eventImage', picture.eventImage);
    formdata.append('codeImage', picture.codeImage);
    formdata.append('active', picture.active);
    api('put', `/appPicture/${picture._id}`, formdata).then((res) => {
      toast.success('picture edited successfully');
      getPictures();
      handleModal();
    });
  };

  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (!file.type.includes('image')) {
      toast.error('Only image can be selected');
      return;
    }
    if (event.target.files && event.target.files[0] && event.target.name === 'eventImage') {
      setPicture({ ...picture, eventImage: event.target.files[0] });
      seteventImage(URL.createObjectURL(event.target.files[0]));
    } else if (event.target.files && event.target.files[0] && event.target.name === 'codeImage') {
      setPicture({ ...picture, codeImage: event.target.files[0] });
      setcodeImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleActiveChange = (e) => {
    setPicture(() => ({
      ...picture,
      active: e.value,
    }));
  };

  const options = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];
  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Edit a Picture
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
                          Event Picture
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
                          {' '}
                          <span style={{ color: 'red' }}>{codeimage ? '' : '*'} </span>Code Picture
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
                        <label className="form-control-label">Active</label>
                        <Select
                          onChange={handleActiveChange}
                          name="active"
                          className="form-control-alternative"
                          defaultValue={{
                            label: `${picture?.active}`,
                            label: picture?.active === true ? 'Yes' : 'No',
                            value: picture?.active,
                          }}
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
            Update
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditPicture;
