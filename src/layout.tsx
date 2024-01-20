import React from "react";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import AppNavigation from "./navigation";
// import { Provider } from "react-redux";
// import { store } from "../redux/store";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// import { AppProvider } from "./contexts/app.context";
import { AppProvider } from "./contexts/app.context";
import ModalRequestPhone from "./pages/modalRequestPhone";

import '../src/css/app.css'
import '../src/css/bottomTabbar.css'
import '../src/css/fontStyle.css'
import '../src/css/icons.css'
import '../src/css/tailwind.css'
import 'zmp-ui/zaui.css';
const queryClient = new QueryClient();
const Layout = () => {


  return (
    // <Provider store={store}>
   <div  className='max-w-[455px] m-auto'>
     <RecoilRoot>
       <App>
         <SnackbarProvider>
           <ZMPRouter>
             <QueryClientProvider client={queryClient}>
               <AppProvider>
                 <AppNavigation />
               </AppProvider>
             </QueryClientProvider>
           </ZMPRouter>
         </SnackbarProvider>
       </App>
     </RecoilRoot>
   </div>
    // </Provider>
  );
};
export default Layout;
