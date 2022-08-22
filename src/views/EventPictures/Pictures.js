/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import api from 'api';
import ReactPaginate from 'react-paginate';
import { Store, UpdateStore } from 'StoreContext';
import {
  Badge,
  Card,
  CardHeader,
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  img,
  Table,
  Container,
  Row,
} from 'reactstrap';

// core components

import Header from 'components/Headers/Header.js';
import { toast } from 'react-toastify';
import AddPicture from './AddPicture';
import EditPicture from './EditPicture';

const Pictures = () => {
  const pagination = useRef();
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [eventimage, seteventImage] = useState('');
  const [codeimage, setcodeImage] = useState('');
  let [picture, setPicture] = useState({
    active: false,
  });

  useEffect(() => {
    getPictures();
  }, []);

  const getPictures = async () => {
    const data = await api('get', '/appPicture/');
    setPictures(data.pictures);
  };

  const handleDelete = (id) => {
    api('delete', `/appPicture/${id}`).then(() => {
      toast.success('background picture deleted successfully');
      getPictures();
    });
  };

  const handleEditModal = (item) => {
    console.log(item, 'item');
    if (item) {
      setPicture({
        _id: item?._id,
        active: item?.active,
        codeImage: item?.codeImage,
        eventImage: item?.eventImage,
      });
      seteventImage(process.env.REACT_APP_SERVER_MEDIA_URL + item?.eventImage);
      setcodeImage(process.env.REACT_APP_SERVER_MEDIA_URL + item?.codeImage);
    }
    setEditModal((open) => !open);
    return openModal;
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="d-flex justify-content-between ">
                  <h3 className="mb-0">Event Background Pictures</h3>
                  <Button color="primary" href="#pablo" onClick={handleModal} size="md">
                    <i className="ni ni-fat-add"></i>
                    Add new Pictures
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Event Picture</th>
                    <th scope="col">Code Picture</th>
                    <th scope="col">Active</th>
                    <th scope="col">Created At</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {pictures?.map((item) => {
                    return (
                      <tr>
                        <td className="text-right">
                          <img
                            src={process.env.REACT_APP_SERVER_MEDIA_URL + item.eventImage}
                            alt="Not Found"
                            style={{
                              height: '70px',
                              width: '70px',
                              float: 'left',
                            }}
                          />
                        </td>
                        <td className="text-right">
                          <img
                            src={process.env.REACT_APP_SERVER_MEDIA_URL + item.codeImage}
                            alt="Not Found"
                            style={{
                              height: '70px',
                              width: '70px',
                              float: 'left',
                            }}
                          />
                        </td>
                        <td>
                          {item.active ? (
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-success" />
                              Yes
                            </Badge>
                          ) : (
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-warning" />
                              No
                            </Badge>
                          )}
                        </td>
                        <td>{new Date(item.createdAt).toDateString()}</td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem href="#pablo" onClick={() => handleEditModal(item)}>
                                Edit
                              </DropdownItem>
                              <DropdownItem href="#pablo" className="text-danger" onClick={() => handleDelete(item._id)}>
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        {/* <div style={{ width: '20% ', margin: 'auto' }}>
          <ReactPaginate
            ref={pagination}
            marginPagesDisplayed={1}
            pageCount={Math.ceil(count / 10)}
            onPageChange={setPageis}
            containerClassName="pagination"
            activeClassName="active"
            pageLinkClassName="page-link"
            breakLinkClassName="page-link"
            nextLinkClassName="page-link"
            previousLinkClassName="page-link"
            pageClassName="page-item"
            breakClassName="page-item"
            nextClassName="page-item"
            previousClassName="page-item"
            previousLabel={<>&laquo;</>}
            nextLabel={<>&raquo;</>}
            style={{ justifyContent: 'center' }}
          />
        </div> */}
        {openModal ? <AddPicture openModal={openModal} handleModal={handleModal} getPictures={getPictures} /> : null}
        {editModal && (
          <EditPicture
            openModal={editModal}
            handleModal={handleEditModal}
            getPictures={getPictures}
            codeimage={codeimage}
            eventimage={eventimage}
            setcodeImage={setcodeImage}
            seteventImage={seteventImage}
            picture={picture}
            setPicture={setPicture}
          />
        )}
      </Container>
    </>
  );
};

export default Pictures;
