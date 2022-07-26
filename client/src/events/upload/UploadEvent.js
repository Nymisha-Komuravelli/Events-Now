import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as eventActions from "../../redux/events/event.actions";
import * as userActions from "../../redux/users/user.actions";
import * as userReducer from "../../redux/users/user.reducer";

const UploadEvent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [event, setEvent] = useState({
    name: "",
    image: "",
    date: "",
    type: "",
    price: "",
    info: "",
  });
  const userInfo = useSelector((state) => state[userReducer.usersFeatureKey]);
  const updateInput = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(eventActions.uploadEvent(event, history));
  };
  return (
    <>
      {/* <pre>{JSON.stringify(userInfo)}</pre> */}
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-danger">
                <i className="fa fa-cloud-upload"></i> Upload an Event
              </p>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Obcaecati in possimus sint magni itaque, unde nemo dicta esse
                inventore eaque quod tenetur quasi laudantium repellendus aut
                nobis incidunt quisquam asperiores.
              </p>
            </div>
          </div>
        </div>
      </section>
      {userInfo.user?.isAdmin ? (
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      value={event.name}
                      onChange={updateInput}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Image"
                      name="image"
                      value={event.image}
                      onChange={updateInput}
                    />
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="type"
                      value={event.type}
                      onChange={updateInput}
                    >
                      <option value="">Event Type</option>
                      <option value="FREE">FREE</option>
                      <option value="PRO">PRO</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price"
                      name="price"
                      value={event.price}
                      onChange={updateInput}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Date"
                      name="date"
                      value={event.date}
                      onChange={updateInput}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Information"
                      rows="4"
                      name="info"
                      value={event.info}
                      onChange={updateInput}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      className="btn btn-danger"
                      value="Upload"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-danger">
                ---You are not authorized to upload---
              </p>
              <small>
                If you are an admin, please contact your DBA for access
              </small>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadEvent;
