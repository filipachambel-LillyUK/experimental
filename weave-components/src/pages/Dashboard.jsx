import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetPaths, addPaths } from "../redux/pathSlice";

export default function Dashboard(){
    const dispatch = useDispatch();

    useEffect(()=> {
        // dispatch(resetPaths());
        dispatch(addPaths({ label: "Dashboard", link: "/dashboard"}));
    },[]);
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard</p>
        </div>
    )
}