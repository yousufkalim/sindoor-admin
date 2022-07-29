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

  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPicture({ ...picture, picture: event.target.files[0] });
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const options = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('image', picture.picture);
    formdata.append('active', picture.active);

    api('post', '/appPicture', formdata).then((res) => {
      toast.success('Picture added successfully');
      getPictures();
      handleModal();
    });
  };

  console.log('p', picture);
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
          Add a Picture
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
