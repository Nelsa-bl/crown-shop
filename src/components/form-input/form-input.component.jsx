// Import style
import './form-input.style.scss';

const FormInput = ({ label, ...otherProps }) => {
  //   console.log(otherProps);
  return (
    <div className='group'>
      <input className='form-input' {...otherProps} />
      {/* Check if label exists */}
      {label && (
        <label
          // Add class "shrink" if input value is not empty
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
