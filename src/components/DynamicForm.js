import React, { useState } from 'react';

const DynamicForm = ({ config, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {config.map((field, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <label htmlFor={field.name}>{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              value={formData[field.name] || ''}
            />
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              value={formData[field.name] || ''}
            />
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
