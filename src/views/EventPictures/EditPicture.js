import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, FormGroup, Form, Input, Row, Col } from 'reactstrap';
// core components
import Select from 'react-select';
const { Option } = Select;

const EditPicture = ({ openModal, handleModal, picture, setImage, setPicture, getPictures, image }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('image', picture.picture);
    formdata.append('active', picture.active);
    api('put', `/appPicture/${picture._id}`, formdata).then((res) => {
      toast.success('picture edited successfully');
      getPictures();
      handleModal();
    });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPicture({ ...picture, picture: event.target.files[0] });
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  console.log(picture, 'p');
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
                        <label className="form-control-label"> Picture</label>{' '}
                        <Input
                          className="form-control-alternative text-default"
                          type="file"
                          accept="image/*"
                          onChange={onImageChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <img src={image} alt="preview image" style={{ height: '100px', width: '50x' }} />
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
