interface IProps {
  name: string;
  onChange:(e: React.ChangeEvent<HTMLInputElement>)=> void;
}

export const Filter: React.FC<IProps> = ({ name, onChange }) => {
  return (
    <div>
      <label htmlFor="find">Filter by keywords</label>
      <input type="text" name="find" value={name} onChange={onChange} />
    </div>
  );
};


