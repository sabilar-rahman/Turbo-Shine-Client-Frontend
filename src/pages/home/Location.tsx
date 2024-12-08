

const Location = () => {
  return (
    <div
      className=" flex items-center justify-center"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d645.3337823885828!2d90.34818751428661!3d23.798708055663983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1733697830851!5m2!1sen!2sbd"
        width="1100"
        height="600"
        style={{ border: 0 }}
        // allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map Location"
      ></iframe>
    </div>
  );
};

export default Location;
