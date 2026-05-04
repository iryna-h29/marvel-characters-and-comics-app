import img from './error.gif';

const ErrorMessage = (message) => {
    return (
        <div>
            <h2>${message}</h2>
            <img src={img}
            style={{ display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: "0 auto"}}
            alt='Error'/>
        </div>
    )
}

export default ErrorMessage;