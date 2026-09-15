import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteChrome } from "@/components/SiteChrome";
import NotFound from "@/pages/NotFound";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import CV from "@/pages/CV";
import Home from "@/pages/Home";
import Outputs from "@/pages/Outputs";
import Research from "@/pages/Research";
import ResearchDetail from "@/pages/ResearchDetail";
import Systems from "@/pages/Systems";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function Router() {
  return <SiteChrome><Switch><Route path="/" component={Home} /><Route path="/research" component={Research} /><Route path="/research/:slug" component={ResearchDetail} /><Route path="/systems" component={Systems} /><Route path="/outputs" component={Outputs} /><Route path="/cv" component={CV} /><Route path="/about" component={About} /><Route path="/contact" component={Contact} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></SiteChrome>;
}

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
