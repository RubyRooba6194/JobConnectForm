const ResumeUpload = ({ onFileChange }) => {
  return (
    <div>
      <label className="block font-medium mb-1">Upload Resume (PDF only)</label>
      <input
        type="file"
        accept=".pdf"
        onChange={onFileChange}
        className="input"
        required
      />
    </div>
  );
};

export default ResumeUpload;
