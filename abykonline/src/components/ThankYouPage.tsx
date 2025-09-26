import React from 'react';

const ThankYouPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background">
      <div className="max-w-md mx-auto text-center space-y-6">
        <h1 className="text-3xl font-bold">Thank You!</h1>
        <p className="text-muted-foreground">
          Your submission has been received. We appreciate your interest and will get back to you soon.
        </p>
        <a href="/" className="inline-block px-6 py-3 mt-4 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default ThankYouPage;