import { createContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './hooks';

export const RegisterContext = createContext(null);
export const RegisterContextProvider = ({ children }) => {
    // Rules to Enter Registre Paths
    const { pathname } = useLocation();
    const {user}= useAuth();
console.log("user" , user)
    // set Data will be sent to api #registre
    const [data, setData] = useState({});
    const [all, setAll] = useState();
    const [prev, setPrev] = useState();
    const [current, setCurrent] = useState();
    const [ModulesSelected, setModulesSelected] = useState([]);
    const save = (name, value) => {
        data[name] = value;
        setData(data);
    }
    const clear = () => {
        setData(null);
    }
    const extract = () => {
        let data_user = { ...data }
        delete data_user.role
        if(data_user.courses_of_interest != null)
            data_user["courses_of_interest"] = data_user["courses_of_interest"].join('#');
        return data_user;
    }
    const saveTemp = (modules) => {
        setModulesSelected(modules);
    }
    const setProgress = (all , prev , current) => {
        setAll(all);
        setPrev(prev);
        setCurrent(current);
    }
    return (
        <RegisterContext.Provider value={{ data, save, clear, extract, all, current, prev , setProgress , saveTemp , ModulesSelected}}>
            {children}
        </RegisterContext.Provider>
    )
}