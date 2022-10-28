import DropdownMenu from "./components/DropdownMenu";

const longOptions = new Array(50000)
  .fill(0)
  .map((_, index) => `${index}`);

function App() {
  return (
    <div className="bg-red-500 min-h-screen">
      <div className="flex justify-center p-12">
        <div className="flex flex-col gap-5">
          <DropdownMenu options={["a", 'b']} />
          <DropdownMenu options={longOptions} multiselect={true} />
        </div>
      </div>
    </div>
  );
}

export default App;
