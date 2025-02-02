import { useState } from "react";
import "./App.css";

import { getRPCService } from "@webext-pegasus/rpc";
import { IWallhavenService } from "@/src/services/Wallhaven.service";

function App() {
    const Wallhaven = getRPCService<IWallhavenService>("WallhavenService", "background");
    const [image, setImage] = useState("");

    useEffect(() => {
        Wallhaven.search().then((res) => {
            setImage(res.data[0].path);
        });
    }, [setImage]);

    const onClick = async () => {
        const res = await Wallhaven.search();
        setImage(res.data[0].path);
    };

    return (
        <>
            <img src={image} width={1280} />
            <div className="card">
                <button onClick={onClick}>Button</button>
            </div>
        </>
    );
}

export default App;
