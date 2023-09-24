import "./Thanks.css";
  
  const Thanks = ({ data }) => {
    return (
      <div className="thanks-container">
        <h2>Thank you {data.name} !</h2>
        <p>
        We will study your application and get back to you as soon as possible.
        </p>
        <p>Any questions ?</p>
        <h3>contact@olea.com</h3>
      </div>
    );
  };
  
  export default Thanks;
  