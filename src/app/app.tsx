import React from "react"
import { FetchACat } from "./FetchACat"
import { FetchACatXState } from "./FetchACatXState"

const App: React.FC = () => {
    return (
        <>
            <h1>Welcome to Socrates 2022</h1>
            <FetchACat />
            <FetchACatXState />
        </>
    )
}

export default App
