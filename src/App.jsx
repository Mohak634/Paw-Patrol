import { useState } from "react";
import { DotPattern } from "./components/ui/dotpattern";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/Textarea";
import { Button } from "./components/ui/Button";
import { Alert, AlertDescription } from "./components/ui/Alert";
import { Camera, Loader2, Navigation, Phone, AlertTriangle, Users, Home, Heart, Building } from "lucide-react";
import clickSound from "/src/meri-jung-emotional.mp3"
import { useRef } from "react";
import "./App.css"


export default function AnimalRescueApp() {
  const [incident, setIncident] = useState({
    name: "",
    phoneNumber: "",
    location: "",
    description: "",
    severity: "medium",
    image: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const handleclick = ()=>{
    console.log("clicked");
    window.open("https://www.his-india.in/contact-us.html", "_blank");
  }
  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
    alert("Report Submitted!")
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncident((prev) => ({ ...prev, [name]: value }));
    setError("");
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError("Please upload an image file");
        return;
      }
      setIncident((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
      setError("");
    }
  };

  const ngoData = [
    {
      name: "PawsProtect Foundation",
      description: "Dedicated to protecting street animals and providing emergency medical care.",
      contact: "+1 (555) 123-4567",
      location: "123 Animal Care Lane",
    },
    {
      name: "Animal Welfare Society",
      description: "Working towards creating a better world for abandoned and injured animals.",
      contact: "+1 (555) 987-6543",
      location: "456 Pet Haven Road",
    }
  ];

  const adoptionCenters = [
    {
      name: "Happy Tails Adoption Center",
      description: "Find your perfect companion from our loving shelter. We have cats, dogs, and more!",
      contact: "+1 (555) 234-5678",
      availablePets: "Dogs, Cats, Rabbits",
    },
    {
      name: "Forever Home Shelter",
      description: "Giving animals a second chance at happiness. Special care for senior pets.",
      contact: "+1 (555) 876-5432",
      availablePets: "Dogs, Cats, Birds",
    }
  ];

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Triggers the hidden file input
  };

  const handleImageCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Selected File: ${file.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <DotPattern className="opacity-30" />

      {/* Navigation Bar */}
      <div className="bg-white shadow-md relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("home")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                  activeTab === "home" ? "bg-blue-50 text-blue-600" : "text-gray-600"
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>
              <button
                onClick={() => setActiveTab("report")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                  activeTab === "report" ? "bg-blue-50 text-blue-600" : "text-gray-600"
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
                <span>Report Incident</span>
              </button>
              <button
                onClick={() => setActiveTab("community")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                  activeTab === "community" ? "bg-blue-50 text-blue-600" : "text-gray-600"
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Community</span>
              </button>
            </div>
            <Button  variant="destructive" className="flex items-center gap-2 cursor-pointer" onClick={handleclick}>
              <Phone className="w-4 h-4" />
              Emergency
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-lg mx-auto relative z-10">
        {activeTab === "home" && (
          <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-800">Animal Rescue Network</h2>
          
          {/* NGO Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Partner NGOs</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {ngoData.map((ngo, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-blue-500" />
                      {ngo.name}
                    </CardTitle>
                    <CardDescription>{ngo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{ngo.contact}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-gray-500" />
                        <span>{ngo.location}</span>
                      </div>
                      <Button className="w-full mt-4">Contact NGO</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Adoption Centers Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Adoption Centers</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {adoptionCenters.map((center, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      {center.name}
                    </CardTitle>
                    <CardDescription>{center.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{center.contact}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>Available: {center.availablePets}</span>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        Schedule Visit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

        {activeTab === "report" && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Report an Animal Incident</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="bg-green-50 text-green-700 border-green-200">
                  <AlertDescription>
                    Report submitted successfully! Thank you for helping animals in need.
                  </AlertDescription>
                </Alert>
              )}
              <form onSubmit={(e) => e.preventDefault()}>
              <Input id="name" className="name input" required placeholder="Your name" value={incident.name} onChange={handleChange} />
              <Input id="phoneNumber"className="phoneNumber input" placeholder="Your phone number" value={incident.phoneNumber} onChange={handleChange} required/>
              <Input id="location" className="location input" placeholder="Enter precise location" value={incident.location} onChange={handleChange} required />
              <Textarea id="description" className="description input" placeholder="Describe the situation" value={incident.description} onChange={handleChange} />
              <button id="button" className="rounded-full bg-green-300 px-4 py-2 m-2">Current Location
              </button>
              <button id="button" className="rounded-full bg-blue-300 px-4 py-2">Share Live Location
              </button>
              <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 upload-btn flex "
                  >
                    <Camera className="w-5 h-5" />
                    Upload Photo
                  </label>
                  <div>
                  {incident.image && (
                    <div className="relative">
                      <img
                        src={incident.image}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                      <button
                        onClick={() => setIncident(prev => ({ ...prev, image: null }))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs "
                      >
                        x
                      </button>
                      </div>)}
                      </div>
              </form>
              
              <Button  className= "cursor-pointer py-1"onClick={playSound}>Submit Report</Button>
            </CardContent>
          </Card>
        )}

        {activeTab === "community" && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Connect with other animal rescue volunteers and supporters in your area.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
