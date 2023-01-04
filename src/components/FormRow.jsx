function FormRow({ type, name, value, onChangeHandler, labelText }) {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChangeHandler}
        className='form-input'
      />
    </div>
  );
}

export default FormRow;
