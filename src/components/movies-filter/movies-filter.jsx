import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../redux/reducers/movies";
import Form from "react-bootstrap/Form";

export const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();

  return (
    <Form inline className="ml-auto">
      <Form.Control
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
        style={{ maxWidth: "200px" }}
      />
    </Form>
  );
};
