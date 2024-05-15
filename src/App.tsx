import FilterContextProvider from "./store/filter-context";
import AccordionContextProvider from "./store/accordion-context";
import MainHeader from "./components/MainHeader";
import DashboardsList from "./components/DashboardsList";

function App() {


  return (
    <FilterContextProvider>
      <MainHeader/>
      <main>
        <AccordionContextProvider>
          <DashboardsList />
        </AccordionContextProvider>
      </main>
    </FilterContextProvider>
  );
}

export default App;
