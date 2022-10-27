import DropdownMenu from "./components/DropdownMenu";

function App() {
  return (
    <div className="bg-red-500 min-h-screen">
      <div className="flex justify-center p-12">
        <div className="flex flex-col gap-5">
          <DropdownMenu />
          <div className="text-center">test</div>
          <div>test</div>

        </div>
      </div>
    </div>
  );
}

export default App;
