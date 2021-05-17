import React, {useEffect, useState} from 'react'

const Contact = () => {

  const [userData, setUserData] = useState({
    name:"", email:"", phone:"", message:""
  });

  const userContact = async () => {
      try {
          const res = await fetch('/getdata', {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
          });

          const data = await res.json();
          console.log(data);
          setUserData({...userData, name:data.name, email: data.email, phone: data.phone});

          if(!res.status === 200){
              const error = new Error(res.error);
              throw error;
          }

      } catch(err){
        console.log('error hai');
      }
  }

  useEffect(() => {
    userContact();
  }, []);


  // we are storring data in state
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;  

    setUserData({ ...userData, [name]:value })
  }

  // send data to backend

  const conatctForm = async (e) => {
    e.preventDefault();

    const {name, email, phone, message} = userData;

    const res = await fetch('/contact', {
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        }, 
        body: JSON.stringify({
          name, email, phone, message
        })
    });

    const data = await res.json();

    if(!data){
      console.log("Msg not send");
    }else{
      alert('Msg Send');
      setUserData({ ...userData, message: "" })
    }

  }

  return(
    <>
        <section className="contact-form mt-5">
          <div className="container">
            <div className="row">
                <div className="col-lg-10 offset-lg-1">
                    <div className="contact_form_title">
                      <h2>Contact</h2>
                      <form method="POST" id="contact_form" className="mt-5">
                          <div className="contact_form_name d-flex justify-content-between align-items-between">
                              <input type="text" id="contact_form_name" className="contact_form_name input_field"
                              name="name"
                              onChange={handleInputs}
                              value={userData.name}
                              placeholder="My Name" required="true" />

                              <input type="email" id="contact_form_email" className="contact_form_email input_field" 
                              name="email"
                              onChange={handleInputs}
                              value={userData.email}
                              placeholder="My email" required="true" />

                              <input type="number" id="contact_form_phone" className="contact_form_phone input_field" 
                              name="phone"
                              onChange={handleInputs}
                              value={userData.phone}
                              placeholder="My Phone" required="true" />
                          </div>
                          <div className="contact_form_text mt-4">
                              <textarea className="text_field contact_form_message" id="" 
                              onChange={handleInputs}
                              name="message"
                              value={userData.message}
                              placeholder="Message" cols="30" rows="10"></textarea>
                          </div>
                          <div className="contact_form_button">
                              <button type="submit" className="button contact_submit_button btn-primary"
                              onClick={conatctForm}
                              >Send Message</button>
                          </div>
                      </form>
                    </div>
                </div>
            </div>
          </div>
          
        </section>
    </>
  )
}

export default Contact