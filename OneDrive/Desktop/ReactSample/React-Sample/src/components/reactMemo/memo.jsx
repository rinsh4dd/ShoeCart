const MyComponent = ({ name }) => {
  console.log("MyComponent rendered");
  return <div>Hello {name}</div>;
};

const MemoMyComponent = React.memo(MyComponent);

function App() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <MemoMyComponent name="Rinshad" />
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Count: {count}</p>
    </div>
  );
}


/* 
👉 Every time you click "Increment":
✅ App re-renders
✅ Child doesn’t re-render because onClick didn’t change (thanks to useCallback)

 */

/* \ React.memo is a higher-order component that memoizes the rendered output of a functional component.
 It re-renders the component only if the props change (by shallow comparison). Otherwise, it reuses the previous render result,
  preventing unnecessary re-renders.
✅ It works for props only — not for internal state or context changes. */