import React from 'react';
import { useParams } from 'react-router-dom';
import Enterprise from './Enterprise'; // The component I created above

import SMBDetail from './SMBDetail';
import DataAndAI from './DataAndAI';

const ServiceDetail = () => {
  const { id } = useParams();

  // Route-based conditional rendering
  if (id === 'enterprise') {
    return <Enterprise />;
  }

  if (id === 'smb') {
    return <SMBDetail />; // You would create this similarly
  }

  if (id === 'dataandai') {
    return <DataAndAI />;
  }

  return (
    <div className="min-h-screen bg-[#06153d] text-white flex items-center justify-center">
      <h1 className="text-2xl">Service "{id}" coming soon.</h1>
    </div>
  );
};




export default ServiceDetail;