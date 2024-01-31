import React from "react";
import {App, ZMPRouter, SnackbarProvider} from "zmp-ui";
import {RecoilRoot} from "recoil";
import AppNavigation from "./navigation";
import {Routes, Route} from "react-router-dom";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import {AppProvider} from "./contexts/app.context";

import '../src/css/app.css'
import '../src/css/bottomTabbar.css'
import '../src/css/fontStyle.css'
import '../src/css/icons.css'
import '../src/css/tailwind.css'
import 'zmp-ui/zaui.css';

const queryClient = new QueryClient();
const Layout = () => {


    return (
        <div className="flex justify-center">
            <div className='max-w-[455px] w-full'>

                <QueryClientProvider client={queryClient}>
                    <AppProvider>
                        <Routes>
                            <Route path={'/*'} element={<AppNavigation/>}/>
                        </Routes>
                    </AppProvider>

                </QueryClientProvider>
            </div>

        </div>


    );
};
export default Layout;
