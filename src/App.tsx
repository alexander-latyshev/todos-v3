import Header from "./components/header";
import Main from "./components/main";
import "./index.css";
import "./App.css";

const App = () => {
  return (
    <div className="flex flex-col gap-5 mobile:w-full laptop:w-[600px]">
      <h1 className="mb-[50px] text-primary mobile:hidden laptop:flex justify-center">
        Todos
      </h1>
      <Header />
      <Main />
    </div>
  );
};

export default App;
