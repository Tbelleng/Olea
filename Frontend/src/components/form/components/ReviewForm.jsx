
  const ReviewForm = ({ data, updateFieldHandler }) => {
    return (
      <div className="review-form">
        <div className="form-control">
          <label htmlFor="financing" className="label">
          How much financing would you like to obtain?
          </label>
          <input
            type="text"
            name="financing"
            id="financing"
            placeholder="213M"
            required
            value={data.financing || ""}
            onChange={(e) => updateFieldHandler("financing", e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="duration" className="label">
          How long will it last?
          </label>
          <input
            type="text"
            name="duration"
            id="duration"
            placeholder="213M"
            required
            value={data.duration || ""}
            onChange={(e) => updateFieldHandler("duration", e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="rate" className="label">
          At what rate would you like to remunerate your investors?
          </label>
          <input
            type="text"
            name="rate"
            id="rate"
            placeholder="5%"
            required
            value={data.rate || ""}
            onChange={(e) => updateFieldHandler("rate", e.target.value)}
          />
        </div>  
        <div className="form-control">
          <label htmlFor="comment">Do you have any questions ?</label>
          <textarea
            name="comment"
            id="comment"
            placeholder="Olea is the best project"
            required
            value={data.comment || ""}
            onChange={(e) => updateFieldHandler("comment", e.target.value)}
          ></textarea>
        </div>
      </div>
    );
  };
  
  export default ReviewForm;
  