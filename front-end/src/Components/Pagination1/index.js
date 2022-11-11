import Pagination from "react-bootstrap/Pagination";

const Pages = ({ onChange, active, pages, maxButtons }) => {
  let items = [];

  const startIndex = active - 1 || 1;
  const endIndex = Math.min(pages, maxButtons + startIndex - 1);

  for (let number = startIndex; number <= endIndex; number++) {
    items.push(
      <Pagination.Item
        onClick={() => onChange(number)}
        key={number}
        active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default Pages;
