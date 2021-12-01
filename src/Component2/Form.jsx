import { useState, useRef, useEffect } from "react";
import axios from "axios";
const getTodo = () => {
  const config = {
    url: "http://localhost:3001/products",
    method: "get"
  };
  return axios(config);
};



const createTodo = (name, age, address, department, salary, maritalStatus) => {
  const payload = {
    name: name,
    age: age,
    address: address,
    department: department,
    salary: salary,
    maritalStatus: maritalStatus ? "True" : "false"
  };
  const config = {
    url: "http://localhost:3001/products",
    method: "post",
    data: payload
  };
  return axios(config);
};


export default function Form() {
  const [todo, setTodo] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    phone:"",
    address:""
  });

  const refImage = useRef(null);

  useEffect(() => {
    getTodo()
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const handleUpdateImage = (e) => {
  //   const file = e.target.files[0];
  //   setFormState({
  //     ...formState,
  //     image: file
  //   });
  // };

  const handleFormUpdate = (e) => {
    let { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormState({
      ...formState,
      [name]: val
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formState.name == "" || formState.age == "" ||  formState.address == "" || formState.department == "" || formState.salary == "" || formState.maritalStatus == "" ){
      console.log("not valid")
      alert('please fill form correctly')
      return
    }
    setIsLoading(true);
  };
  if(isLoading){
    return <h1>Order is Place</h1>
  }
 
  return (
    <>
    
      <form>
        <div>
          <div>
            <lable>Name : </lable>
            <input
              onChange={handleFormUpdate}
              value={formState.name}
              placeholder="Name"
              type="text"
              name="name"
            />
          </div>
          <br />
          <div>
            <lable>Phone : </lable>
            <input
              onChange={handleFormUpdate}
              value={formState.age}
              placeholder="Age"
              type="number"
              name="age"
            />
          </div>
          <br />
          <div>
            <lable>Address : </lable>
            <input
              onChange={handleFormUpdate}
              value={formState.address}
              placeholder="Address"
              type="text"
              name="address"
            />
          </div>
          <br />
         
          {/* <div>
          <label>Profile Picture : </label>
          <input type="file" ref={refImage} onChange={handleUpdateImage} />
        </div> */}
          <br />
          <button onClick={handleSubmit} ref={refImage}>
            Submit
          </button>
        </div>
      </form>
      
      
    </>
  );
}
