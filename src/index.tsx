import React from "react"
import { createRoot } from "react-dom/client"
import "./main.css"
import App from "./app/app"

console.log("Hello World!")

const root = createRoot(document.getElementById("app-container")!)
root.render(<App />)
