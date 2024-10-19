import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetPaths, addPaths } from "../redux/pathSlice";

export default function Homepage(){
    const dispatch = useDispatch();

    useEffect(()=> {
        // dispatch(resetPaths());
         dispatch(addPaths({ label:"Homepage", link: "/homepage"}));
    }, [dispatch]);
    return (
        <div>
            <h1>Homepage</h1>
            <p>Welcome to the homepage</p>
        </div>
    )
}