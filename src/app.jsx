import * as React from "react";
import { Dashboard } from "./components/Dashboard";
import { SoundManager } from "./components/SoundManager/SoundManager";

export class App extends React.Component<{}> {
    render() {
        return (
            <>
                <SoundManager />
                <Dashboard />
            </>
        );
    }
}
