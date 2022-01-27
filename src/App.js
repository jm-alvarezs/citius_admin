import { ClassInstructorProvider } from "./context/ClassInstructorContext";
import { CoachesProvider } from "./context/CoachesContext";
import { CustomerProvider } from "./context/CustomerContext";
import { HomeProvider } from "./context/HomeContext";
import { LocationsProvider } from "./context/LocationsContext";
import { ModalProvider } from "./context/ModalContext";
import { PurchaseProvider } from "./context/PurchasesContext";
import { PaquetesProvider } from "./context/PackageContext";
import { UserProvider } from "./context/UserContext";
import { ClassTypeProvider } from "./context/ClassTypesContext";
import { ClassCategoryProvider } from "./context/ClassCategoryContext";
import { CheckoutProvider } from "./context/CheckoutContext";
import { DiscountsProvider } from "./context/DiscountsContext";
import { AnaliticasProvider } from "./context/AnaliticasContext";
import { MetodosProvider } from "./context/MetodosContext";
import { ReservationsProvider } from "./context/ReservationsContext";
import Main from "./Main";
import "./index.css";
import { VideosProvider } from "./context/VideosContext";
import { VideoTypeProvider } from "./context/VideoTypeContext";
import { ProgramsProvider } from "./context/ProgramsContext";
import { UsersProvider } from "./context/UsersContext";
import { CircuitProvider } from "./context/CircuitContext";

function App() {
  return (
    <ModalProvider>
      <UserProvider>
        <PaquetesProvider>
          <LocationsProvider>
            <CoachesProvider>
              <CustomerProvider>
                <HomeProvider>
                  <PurchaseProvider>
                    <ClassTypeProvider>
                      <ClassInstructorProvider>
                        <ClassCategoryProvider>
                          <DiscountsProvider>
                            <CheckoutProvider>
                              <AnaliticasProvider>
                                <MetodosProvider>
                                  <ReservationsProvider>
                                    <ClassTypeProvider>
                                      <VideosProvider>
                                        <VideoTypeProvider>
                                          <ProgramsProvider>
                                            <UsersProvider>
                                              <CircuitProvider>
                                                <Main />
                                              </CircuitProvider>
                                            </UsersProvider>
                                          </ProgramsProvider>
                                        </VideoTypeProvider>
                                      </VideosProvider>
                                    </ClassTypeProvider>
                                  </ReservationsProvider>
                                </MetodosProvider>
                              </AnaliticasProvider>
                            </CheckoutProvider>
                          </DiscountsProvider>
                        </ClassCategoryProvider>
                      </ClassInstructorProvider>
                    </ClassTypeProvider>
                  </PurchaseProvider>
                </HomeProvider>
              </CustomerProvider>
            </CoachesProvider>
          </LocationsProvider>
        </PaquetesProvider>
      </UserProvider>
    </ModalProvider>
  );
}

export default App;
