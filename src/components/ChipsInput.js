const options = ['Option 1', 'Option 2', 'Option 3'];

const ChipInput = ({ value, onChange }) => (
  <div>
    {options.map((option) => (
      <span
        key={option}
        style={{
          padding: '5px 10px',
          margin: '5px',
          border: '1px solid black',
          borderRadius: '15px',
          backgroundColor: value === option ? 'lightblue' : 'white',
          cursor: 'pointer',
        }}
        onClick={() => onChange(option)}
      >
        {option}
      </span>
    ))}
  </div>
);
