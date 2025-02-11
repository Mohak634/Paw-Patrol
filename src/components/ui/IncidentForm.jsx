import { useState } from 'react';
// import Card from '../ui/Card';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Alert from '../ui/Alert';
import { Camera, Loader2, MapPin, Crosshair } from 'lucide-react';
import './IncidentForm.css';

const IncidentForm = () => {
  const [incident, setIncident] = useState({
    name: '',
    phoneNumber: '',
    location: '',
    description: '',
    severity: 'medium',
    image: null,
    coordinates: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncident(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      setIncident(prev => ({ ...prev, image: URL.createObjectURL(file) }));
      setError('');
    }
  };

  const handleGetCurrentLocation = () => {
    setIsGettingLocation(true);
    // Simulate geolocation
    setTimeout(() => {
      setIncident(prev => ({
        ...prev,
        coordinates: { latitude: 40.7128, longitude: -74.0060 },
        location: '40.712800, -74.006000'
      }));
      setIsGettingLocation(false);
    }, 1000);
  };

  const validateForm = () => {
    if (!incident.name.trim()) {
      setError('Name is required');
      return false;
    }
    // Add other validations...
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setIncident({
        name: '',
        phoneNumber: '',
        location: '',
        description: '',
        severity: 'medium',
        image: null,
        coordinates: null
      });
    } catch (err) {
      setError('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="incident-form">
      <h2 className="form-title">Report an Animal Incident</h2>
      
      <form onSubmit={handleSubmit} className="form-content">
        {error && <Alert variant="error">{error}</Alert>}
        {success && (
          <Alert variant="success">
            Report submitted successfully! Thank you for helping animals in need.
          </Alert>
        )}

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            name="name"
            value={incident.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </div>

        {/* Add other form fields... */}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="icon-spin" />
              Submitting...
            </>
          ) : (
            'Submit Report'
          )}
        </Button>
      </form>
    </Card>
  );
};

export default IncidentForm;