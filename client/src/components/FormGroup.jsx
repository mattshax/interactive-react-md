import React, { PropTypes } from 'react';
import TextField from 'react-md/lib/TextFields';

const FormGroup = ({ index }) => (
  <section className="md-grid" aria-labelledby={`new-row-group-${index + 1}`}>
    <h2 id={`new-row-group-${index + 1}`} className="md-cell md-cell--12">New Row {index + 1}</h2>
    <TextField
      id={`dessert-calories-${index}`}
      name={`calories-${index}`}
      type="number"
      label="Calories"
      defaultValue={172}
      placeholder="172"
      className="md-cell md-cell--bottom"
    />
  </section>
);

FormGroup.propTypes = {
  index: PropTypes.number.isRequired,
};

export default FormGroup;