import SimpleButton from "@/components/SimpleButton";
const SimpleButton = ({ children, ...props }) => {
  return (
    <button 
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      {...props}
    >
      {children}
    </button>
  );
};

export default SimpleButton;