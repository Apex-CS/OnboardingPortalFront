interface ErrorMessageProps {
  title: string;
  description: string;
}

const ErrorMessage = ({ title, description }: ErrorMessageProps) => {
  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
      <label
        htmlFor="outlined_error"
        className="font-bold tracking-tight text-2xl text-lg text-red-600 bg-white"
      >
        {title}
      </label>
      <p
        id="outlined_error_help"
        className="mt-2 text-lg text-red-600 dark:text-red-400"
      >
        {description}
      </p>
    </div>
  );
};

export default ErrorMessage;
