export default function FormInput({
  label,
  name,
  placeholder,
  register,
  type,
  autoComplete,
  errors,
  required,
  validateFunc,
}) {

   let validation = {
        required: {
            value: required,
            message: `Field ${name} is required!`,
        }
    };

   if(validateFunc) {
       validation = {
           ...validation,
           validate: (value) => validateFunc(value)
       }
   }

  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          {...register(name, validation)}
          placeholder={placeholder}
          type={type}
          name={name}
          id={name}
          autoComplete={autoComplete}
          className="block pl-3 w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {errors[name] && (
          <span className="text-red-500 text-sm">{errors[name].message}</span>
        )}
      </div>
    </>
  );
}
