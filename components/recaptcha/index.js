import ReCAPTCHA from "react-google-recaptcha";

const Recaptcha = ({ onChange }) => {
  const handleRecaptchaChange = (value) => {
    // Pass the reCAPTCHA response value to the parent component
    onChange(value);
  };

  return (
    <ReCAPTCHA
      sitekey={process.env.SITE_KEY}
      onChange={handleRecaptchaChange}
    />
  );
};

export default Recaptcha;
