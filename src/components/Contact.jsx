import { motion } from 'framer-motion';
import { useState } from 'react';

const ContactForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSubmitSuccess(false);

    try {
      // Simulate API call (replace with actual backend endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay for 1 second
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg shadow-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-4xl font-bold mb-6 text-white text-center">
          Contact Me
        </h2>
        <p className="text-gray-300 mb-8 text-center">
          I'd love to hear from you! 
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <motion.div variants={itemVariants} className="relative">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your full name"
              aria-label="Your full name"
            />
          </motion.div>

          {/* Email Field */}
          <motion.div variants={itemVariants} className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
              aria-label="Your email address"
            />
          </motion.div>

          {/* Message Field */}
          <motion.div variants={itemVariants} className="relative">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your message here..."
              aria-label="Your message"
            />
          </motion.div>

          {/* Submit Button and Feedback */}
          <motion.div variants={itemVariants} className="text-center">
            {error && (
              <p className="text-red-500 mb-4">{error}</p>
            )}
            {submitSuccess && (
              <p className="text-green-500 mb-4">Message sent successfully!</p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              {isSubmitting ? 'Sending...' : 'send'}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactForm;