import {
    useEffect,
    useState,
    type ReactNode,
} from "react"
import { ThemeContext, type Theme } from "../context/ThemeContext"

type Props = {
    children: ReactNode
}

export default function ThemeProvider({ children }: Props) {
    const [theme, setTheme] = useState<Theme>("dark")

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"))
    }

    useEffect(() => {
        const root = document.documentElement
        if (theme === "dark") {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
