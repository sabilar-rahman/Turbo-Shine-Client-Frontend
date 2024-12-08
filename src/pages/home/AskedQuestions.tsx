const AskedQuestions = () => {
    return (
      <div>
        <div className="collapse collapse-arrow bg-base-200 mb-4">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            What is Turbo Shine used for?
          </div>
          <div className="collapse-content">
            <p>Turbo Shine is a car detailing product designed to provide a glossy finish and protect surfaces from dirt, dust, and environmental damage.</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200 mb-4">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            How do I book a car wash service?
          </div>
          <div className="collapse-content">
            <p>You can book a car wash service through our website or mobile app. Select a time slot and service package, then confirm your booking.</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200 mb-4">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            What payment methods are accepted?
          </div>
          <div className="collapse-content">
            <p>We accept major credit/debit cards, mobile payments, and cash at select locations.</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200 mb-4">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            Do I need to bring my car to a specific location?
          </div>
          <div className="collapse-content">
            <p>We offer both in-location services and mobile car wash services for added convenience.</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200 mb-4">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            Are there any membership plans available?
          </div>
          <div className="collapse-content">
            <p>Yes, we offer membership plans that include discounted rates and priority bookings for regular customers.</p>
          </div>
        </div>
      </div>
    );
};
  
export default AskedQuestions;
