const UserForm = ({ data, updateFieldHandler }) => {
    return (
      <div>
        <div className="form-control">
          <label htmlFor="name" className="label">
            Your Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="1inch"
            required
            value={data.name || ""}
            onChange={(e) => updateFieldHandler("name", e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="email" className="label">
            E-mail:
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="retibi_i@etna-alternance.net"
            required
            value={data.email || ""}
            onChange={(e) => updateFieldHandler("email", e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="business_segment" className="label">
          business segment:
          </label>
          <input
            type="text"
            name="business_segment"
            id="business_segment"
            placeholder="IT"
            required
            value={data.business_segment || ""}
            onChange={(e) => updateFieldHandler("business_segment", e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="company_name" className="label">
            Name of the company:
          </label>
          <input
            type="text"
            name="company_name"
            id="company_name"
            placeholder="Weblib"
            required
            value={data.company_name || ""}
            onChange={(e) => updateFieldHandler("company_name", e.target.value)}
          />
        </div>
      </div>
    );
  };
  
  export default UserForm;
  