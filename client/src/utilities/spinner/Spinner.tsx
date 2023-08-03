interface Props {
  size: number;
}

const Spinner: React.FC<Props> = ({ size }) => {
  return (
    <span className="spinner" style={{ width: size, height: size }}></span>
  );
};

export default Spinner;
