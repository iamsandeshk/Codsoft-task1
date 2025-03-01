
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center glass-card p-8 rounded-lg max-w-md mx-auto animate-scale-in">
        <div className="mb-6">
          <div className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            404
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Page not found</h1>
        
        <p className="text-gray-600 mb-8">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <Button asChild className="button-hover-effect">
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
