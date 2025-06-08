import React from 'react';
import Layout from '../components/Layout';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackHistory from '../components/FeedbackHistory';
import FeedbackRealTime from '../components/FeedbackRealTime';
import EquityDashboard from '../components/EquityDashboard';

const FeedbackPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feedback Center</h1>
          <p className="text-gray-600 mt-1">Share your thoughts and help us improve fairness and equity on the platform</p>
        </div>
        
        <FeedbackRealTime />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeedbackForm />
          <FeedbackHistory />
        </div>

        <EquityDashboard />
      </div>
    </Layout>
  );
};

export default FeedbackPage;
