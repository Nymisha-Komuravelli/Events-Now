import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import concert from "../../assets/img/concert.jpg";
import * as eventsActions from "../../redux/events/event.actions";
import * as eventReducer from "../../redux/events/event.reducer";
import Spinner from "../../root/util/spinner/Spinner";

const ProEvents = () => {
  const dispatch = useDispatch();
  const eventsInfo = useSelector(
    (state) => state[eventReducer.eventsFeatureKey]
  );

  useEffect(() => {
    dispatch(eventsActions.getProEvents());
  }, []);

  let { loading, events } = eventsInfo;
  return (
    <>
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-danger">PRO Events</p>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Obcaecati in possimus sint magni itaque, unde nemo dicta esse
                inventore eaque quod tenetur quasi laudantium repellendus aut
                nobis incidunt quisquam asperiores.
              </p>
              <p className="h5">Total Available Events: {events?.length}</p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section>
          <div className="container">
            <div className="row">
              {events?.map((event) => (
                <div className="col-4" key={event._id}>
                  <div className="card">
                    <img src={event.image} alt="" />
                    <div className="card-body text-center">
                      <p className="h4">{event.name}</p>
                      <p className="h6">DATE: {event.date}</p>
                      <p>
                        <small>Price: {event.price}</small>
                      </p>
                      <button className="btn btn-sm btn-danger">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProEvents;
