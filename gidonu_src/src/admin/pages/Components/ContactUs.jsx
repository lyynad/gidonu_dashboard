import message from "../../assets/images/message.png";

import "../../assets/css/ContactUs.css";

const ContactUs = () => {
  return (
    <div>
      <a
        href="contact-form"
        onClick={() => {
          let urlWithoutParams = window.location.href.split("?")[0];
          window.history.replaceState({}, document.title, urlWithoutParams);
        }}
      >
        <div className="absolute contactUs bottom-[50px] right-[50px] rounded-[50%] bg-[#5294A6] ">
          <div className="w-[50px] h-[50px] flex items-center justify-center">
            <img src={message} className="w-[30px] " alt={"message"} />
          </div>
        </div>
      </a>
    </div>
  );
};

export default ContactUs;
