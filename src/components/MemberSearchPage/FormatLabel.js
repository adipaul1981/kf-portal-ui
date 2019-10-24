import React from 'react';
import PropTypes from 'prop-types';

/**
 * Formats a text value. Returns the same text value
 * with a portion of the text in bold.
 * @param {String}    value           Text to be formatted (ex. "xx abc yy")
 * @param {[String]}  highLightValues Array of highlighted texts
 * (ex. ["...", "xx <em>abc</em> yy", ".."]
 * @param classname
 * @param index
 * @return {Object} (ex. <div>xx <b>abc</b> yy</div>
 */

const regex = /<\/?em>/gi;

const FormatLabel = ({ value, highLightValues, classname = '', index }) => {
  if (!highLightValues) {
    return (
      <div key={index} className={`format-label ${classname}`}>
        {value}
      </div>
    );
  }

  const isHighlight = hit => {
    return value === hit.replace(regex, '');
  };

  // eslint-disable-next-line no-unused-vars
  const [head, ...tail] = highLightValues.filter(isHighlight);

  if (head) {
    const arr = head.split(regex);
    const [first = '', second = '', third = ''] = arr;

    return (
      <div key={index} className={`format-label ${classname}`}>
        {first}
        <b>{second}</b>
        {third}
      </div>
    );
  } else {
    return (
      <div key={index} className={`format-label ${classname}`}>
        {value}
      </div>
    );
  }
};

FormatLabel.propTypes = {
  value: PropTypes.string.isRequired,
  highLightValues: PropTypes.array,
  classname: PropTypes.string,
  index: PropTypes.number.isRequired,
};

export default FormatLabel;