
interface props {
    error: null | string
}
const ErrorMessage = ({error}: props) => {
  return (
    <div>
          <p>{error}</p>
    </div>
  )
}

export default ErrorMessage;
