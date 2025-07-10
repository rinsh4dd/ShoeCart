const fruits = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Mango" },
];

function Lists() {
  return (
    <div>
      <ul>
        {fruits.map((fruit) => {
          return <li key={fruit.id}>{fruit.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default Lists;
